import { TestBed } from '@angular/core/testing';

import { IMCRecordService } from './imcrecord.service';

describe('IMCRecordService', () => {
  let service: IMCRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IMCRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
