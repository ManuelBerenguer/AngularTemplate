import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { IDictionary } from 'shared-lib';
import { AssetLinkTypeEnum } from '../../core/enums/asset-link-type.enum';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { ErrorModalComponent } from './error-modal/error-modal.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  fileUploadModalRef: BsModalRef;
  maxFilesErrorModalRef: BsModalRef;
  extensionsErrorModalRef: BsModalRef;

  fileUploadForm: FormGroup;

  @ViewChild(ModalDirective, { static: false }) fileUploadModal: ModalDirective;

  // We get reference to upload button html element
  @ViewChild('uploadBtn', {static: false}) uploadBtn: ElementRef<HTMLElement>;

  public showProgressBar = false;
  public data: any;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    public storeLitePresentation: StoreLitePresentation) {}

  ngOnInit() {
    // We init the input data for the nested generic reactive form for radio buttons
    this.data = {
      name: 'linked',
      selectors: [AssetLinkTypeEnum.PartNumber, AssetLinkTypeEnum.Application],
      controls: [{
        id: 'partNumberBtn',
        value: AssetLinkTypeEnum.PartNumber,
        text: 'By Part Number',
        iconUrl: './assets/icons/iconVehicles.svg#iconVehicles'
      }, {
        id: 'applicationBtn',
        value: AssetLinkTypeEnum.Application,
        text: 'By Catalogue Application',
        iconUrl: './assets/icons/iconCatalogue.svg#iconCatalogue'
      }]
    };

    // We init the Reactive Form
    this.fileUploadForm = this.fb.group({
      linked: [null, [Validators.required]], // radio button for linked control
      assets: ['', [Validators.required]] // file input to select files from disk
    });
  }

  /**
   * getter to acces the linked control
   */
  get myLinkedControl() {
    return this.fileUploadForm.get('linked');
  }

  /**
   * getter to acces the file control
   */
  get myFilesControl() {
    return this.fileUploadForm.get('assets');
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
   * First, we check if they fit the restrictions and if they do we upload them to the server.
   * If they don't fit the requirements we show the correspondent error.
   */
  async handleAssets(files: FileList) {

    // We hide the upload file modal window
    this.fileUploadModalRef.hide();
    // We check if the files selected fit the requirements to be uploaded
    const filesCheck: IDictionary<any> = await this.storeLitePresentation.isUploadValid(files);

    // If we can proceed with the upload
    if (filesCheck[this.storeLitePresentation.UPLOAD_VALID_KEY]) {
      this.showProgressBar = true;

      /**
       * Notice that with takeWhile we unsubscribe at some condition.
       */
      const uploadSubscription: Subscription = this.storeLitePresentation.uploadAssets(files, this.myLinkedControl.value)
      .pipe(takeWhile(progressObj => !progressObj.completed, true)).subscribe(progressObj => {

        if (progressObj.completed) {

          // We hide the progress bar widget
          this.showProgressBar = false;

          if (progressObj.success) {
            this.showUploadSuccessModal();
          } else {
            this.showUploadFailedModalError();
          }

        } else {
          if (progressObj.progress) {
            console.log(progressObj.progress); // TODO
          }
        }
      });

    } else {
      // If there is an error with the number of files
      if (!filesCheck[this.storeLitePresentation.UPLOAD_NUMBER_OF_FILES_VALID_KEY]) {
        this.showNumberOfFilesModalError();
      } else {
        // If there is an error with the extensions allowed
        if (!filesCheck[this.storeLitePresentation.UPLOAD_FILE_TYPES_VALID_KEY]) {
          this.showFileTypesModalError();
        }
      }
    }
  }

  private showUploadSuccessModal() {
    const initialState = {
      title: 'Your files have been uploaded succesfully.',
      body: 'The server is now processing your files. <br /> You can view your progress and next actions from the navigation bar at the top.',
      list: []
    };

    const ref = this.showModalCentered(ErrorModalComponent, initialState);
  }

  private showUploadFailedModalError() {
    const initialState = {
      title: 'There was an error trying to upload your files.',
      body: "Please, retry in a few seconds.",
      list: []
    };

    const ref = this.showModalCentered(ErrorModalComponent, initialState);

    this.handleSelectFilesAgain(ref);
  }

  private showNumberOfFilesModalError() {

    const initialState = {
      title: 'Your file contains more than 5 assets.',
      body: "Please adjust your file to only 5. <br /> Alternatively, to upgrade to Pro and unlimited uploads <br /> please contact your Account manager.",
      list: []
    };

    const ref = this.showModalCentered(ErrorModalComponent, initialState);

    this.handleSelectFilesAgain(ref);
  }

  private showFileTypesModalError() {

    const initialState = {
      title: 'Your file contains extensions not allowed.',
      body: 'Please adjust your file to contain only: ',
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
