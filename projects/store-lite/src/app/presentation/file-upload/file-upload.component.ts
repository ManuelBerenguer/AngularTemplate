import { Component, OnInit, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit {

  fileuploadModalRef: BsModalRef;

  fileUploadForm: FormGroup;

  constructor(private modalService: BsModalService, private fb: FormBuilder) { }

  ngOnInit() {
    this.fileUploadForm = this.fb.group({
      linked: ['', [Validators.required]],
      assets: [null, [Validators.required]]
    });
  }

  get myLinkedControl() {
    return this.fileUploadForm.get('linked');
  }

  get myFilesControl() {
    return this.fileUploadForm.get('assets');
  }

  openModal(template: TemplateRef<any>) {
    this.fileuploadModalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-centered' }) // Vertically centered adding the correspondent bootstrap class
      );
  }

  handleAssets(files: FileList) {

  }

  submitFileUploadForm() {
    console.log(this.myLinkedControl.value);
    return false;
  }
}
