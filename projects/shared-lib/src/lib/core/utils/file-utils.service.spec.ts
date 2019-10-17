import { TestBed } from '@angular/core/testing';
import { FileUtilsService } from './file-utils.service';

describe('FileUtilsService', () => {

  let service: FileUtilsService; // Add this

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(FileUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('areExtensionsAllowed', () => {
    it('should return true, basic all valid', () => {

      const response: boolean = service.areExtensionsAllowed(['asdasdasd.png', 'asda.sdasd.JPG ', 'asdasdasd.png'], ['jpg', 'png']);

      expect(response).toEqual(true);
    });

    it('should return false, not allowed file', () => {

      const response: boolean = service.areExtensionsAllowed(['asdasdasd.txt', 'asda.sdasd.JPG ', 'asdasdasd.png'],
      ['jpg', 'png', 'TIFF ']);

      expect(response).toEqual(false);
    });

    it('should return false, null as file', () => {

      const response: boolean = service.areExtensionsAllowed([null, 'asda.sdasd.JPG ', 'asdasdasd.png'], ['jpg', 'png']);

      expect(response).toEqual(false);
    });

    it('should return false, undefined as file', () => {

      const response: boolean = service.areExtensionsAllowed([undefined, 'asda.sdasd.JPG ', 'asdasdasd.png'], ['jpg', 'png']);

      expect(response).toEqual(false);
    });

    it('should return false, empty as files', () => {

      const response: boolean = service.areExtensionsAllowed([], ['jpg', 'png']);

      expect(response).toEqual(false);
    });

    it('should return false, null as files', () => {

      const response: boolean = service.areExtensionsAllowed(null, ['jpg', 'png']);

      expect(response).toEqual(false);
    });

    it('should return false, undefined as files', () => {

      const response: boolean = service.areExtensionsAllowed(undefined, ['jpg', 'png']);

      expect(response).toEqual(false);
    });

    it('should return false, empty as valid extensions', () => {

      const response: boolean = service.areExtensionsAllowed(['asda.sdasd.JPG ', 'asdasdasd.png'], []);

      expect(response).toEqual(false);
    });

    it('should return false, null as valid extensions', () => {

      const response: boolean = service.areExtensionsAllowed(['asda.sdasd.JPG ', 'asdasdasd.png'], null);

      expect(response).toEqual(false);
    });

    it('should return false, undefined as valid extensions', () => {

      const response: boolean = service.areExtensionsAllowed(['asda.sdasd.JPG ', 'asdasdasd.png'], undefined);

      expect(response).toEqual(false);
    });


    it('should return true, basic all valid', () => {

      const response: boolean = service.areExtensionsAllowed([
        'asdasd/asdasd/asdasdasd.png',
        'asdasd/asdasd/asdasdasd.   PNG ',
        'asda.sdasd.JPG ',
        'asdasdasd.jpg'], ['jpG ', 'png']);

      expect(response).toEqual(true);
    });

  });

});
