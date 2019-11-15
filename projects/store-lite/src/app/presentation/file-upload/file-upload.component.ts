import { Component, ElementRef, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AssetLinkTypeEnum, AssetLinkTypeTextEnum } from '../../core/enums/asset-link-type.enum';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { NotificationsConstants } from '../../core/constants/notifications.constants';
import { UploadErrorTypes } from '../../core/enums/upload-error-types.enum';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent extends BaseComponent {

  private readonly linkedControlName = 'linked';
  private readonly assetsControlName = 'assets';
  private readonly uploadBtnId = 'uploadBtn';
  private readonly partNumberBtnId = 'partNumberBtn';
  private readonly applicationBtnId = 'applicationBtn';
  private readonly vehicleIconUrl = './assets/icons/iconVehicles.svg#iconVehicles';
  private readonly catalogueIconUrl = './assets/icons/iconCatalogue.svg#iconCatalogue';

  fileUploadModalRef: BsModalRef;
  maxFilesErrorModalRef: BsModalRef;
  extensionsErrorModalRef: BsModalRef;

  fileUploadForm: FormGroup;

  @ViewChild(ModalDirective, { static: false }) fileUploadModal: ModalDirective;

  // We get reference to upload button html element
  @ViewChild('uploadBtn', {static: false}) uploadBtn: ElementRef<HTMLElement>;

  public showProgressBar = false;
  public progressBarPercentage = 0;
  public data: any;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    public storeLitePresentation: StoreLitePresentation) {
      super();
    }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    // We init the input data for the nested generic reactive form for radio buttons
    this.data = {
      name: this.linkedControlName,
      selectors: [AssetLinkTypeEnum.PartNumber, AssetLinkTypeEnum.Application],
      controls: [{
        id: this.partNumberBtnId,
        value: AssetLinkTypeEnum.PartNumber,
        text: AssetLinkTypeTextEnum.PartNumber,
        iconUrl: this.vehicleIconUrl
      }, {
        id: this.applicationBtnId,
        value: AssetLinkTypeEnum.Application,
        text: AssetLinkTypeTextEnum.Application,
        iconUrl: this.catalogueIconUrl
      }]
    };

    // We init the Reactive Form
    this.fileUploadForm = this.fb.group({
      linked: [null, [Validators.required]], // radio button for linked control
      assets: ['', [Validators.required]] // file input to select files from disk
    });

    this.addSubscriptions(

      this.storeLitePresentation.filesUploadError$.subscribe(
        (error: any) => {
          // If the error is not null
          if (error) {
            this.fileUploadModalRef.hide();

            switch (error.type) {
              case UploadErrorTypes.MaxNumberOfFiles:
                    this.showNumberOfFilesModalError();
                    break;
                case UploadErrorTypes.FileTypesNotAllowed:
                    this.showFileTypesModalError();
                    break;
                case UploadErrorTypes.ApiError:
                    this.showUploadFailedModalError();
                    break;
            }
          }

        }
      ),

      this.storeLitePresentation.filesUploadSuccess$.subscribe(
        (success: boolean) => {
          if (success) {
            this.showUploadSuccessModal();
          }
        }
      ),

      this.storeLitePresentation.filesUploadReady$.subscribe(
        (ready: boolean) => {
          this.showProgressBar = !ready;
        }
      ),

      this.storeLitePresentation.filesUploadProgress$.subscribe(
        (percentage: number) => {
          this.progressBarPercentage = percentage;
        }
      ),

      this.storeLitePresentation.filesUploadUploading$.subscribe(
        (uploading: boolean) => {
          if (uploading) {
            this.fileUploadModalRef.hide();
          }
        }
      )

    );

  }

  /**
   * getter to acces the linked control
   */
  get myLinkedControl() {
    return this.fileUploadForm.get(this.linkedControlName);
  }

  /**
   * getter to acces the file control
   */
  get myFilesControl() {
    return this.fileUploadForm.get(this.assetsControlName);
  }

  /**
   *
   * @param template the modal window template
   *
   * @description Opens the file upload modal window based on the template provided
   */
  openFileUploadModal(template: TemplateRef<any>) {
    this.fileUploadModalRef = this.showModalCentered(template, {});
  }

  /**
   *
   * @param files HTML input file list
   *
   * @description Handles how we should proceed once the user has selected some files from the disk to be uploaded.
   *
   */
  async handleAssets(files: FileList) {
    // We call our presentation service to do the job
    this.storeLitePresentation.uploadAssets(files, this.myLinkedControl.value);
  }

  private showUploadSuccessModal() {
    const initialState = {
      title: NotificationsConstants.filesUploadSuccessTitle,
      body: NotificationsConstants.filesUploadSuccessBody,
      list: []
    };

    const ref = this.showModalCentered(ErrorModalComponent, initialState);
  }

  private showUploadFailedModalError() {
    const initialState = {
      title: NotificationsConstants.filesUploadErrorTitle,
      body: NotificationsConstants.filesUploadErrorBody,
      list: []
    };

    const ref = this.showModalCentered(ErrorModalComponent, initialState);

    this.handleSelectFilesAgain(ref);
  }

  private showNumberOfFilesModalError() {

    const initialState = {
      title: NotificationsConstants.NumberOfFilesUploadedErrorTitle,
      body: NotificationsConstants.NumberOfFilesUploadedErrorBody,
      list: []
    };

    const ref = this.showModalCentered(ErrorModalComponent, initialState);

    this.handleSelectFilesAgain(ref);
  }

  private showFileTypesModalError() {

    const initialState = {
      title: NotificationsConstants.FileTypesUploadErrorTitle,
      body: NotificationsConstants.FileTypesUploadErrorBody,
      list: this.storeLitePresentation.loggedUser.allowedAssetsFilesTypesList
    };

    const ref = this.showModalCentered(ErrorModalComponent, initialState);

    this.handleSelectFilesAgain(ref);
  }

  private handleSelectFilesAgain(ref: BsModalRef) {
    // Specifying take(1) we are automatically unsubscribing after first value received
    ref.content.selectFilesAgainAction$.pipe(take(1)).subscribe(
      () => {
        this.uploadBtn.nativeElement.click();
      }
    );
  }

  private showModalCentered(modal: any, initialState: any) {
    return this.modalService.show(
      modal,
      Object.assign({}, { class: 'modal-dialog-centered', initialState }) // Vertically centered adding the correspondent bootstrap class
    );
  }
}
