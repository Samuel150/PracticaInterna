import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteAdministrativoComponent } from './asistente-administrativo.component';

describe('AsistenteAdministrativoComponent', () => {
  let component: AsistenteAdministrativoComponent;
  let fixture: ComponentFixture<AsistenteAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenteAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenteAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
