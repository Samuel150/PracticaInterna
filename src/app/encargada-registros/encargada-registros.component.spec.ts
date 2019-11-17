import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargadaRegistrosComponent } from './encargada-registros.component';

describe('EncargadaRegistrosComponent', () => {
  let component: EncargadaRegistrosComponent;
  let fixture: ComponentFixture<EncargadaRegistrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncargadaRegistrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncargadaRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
