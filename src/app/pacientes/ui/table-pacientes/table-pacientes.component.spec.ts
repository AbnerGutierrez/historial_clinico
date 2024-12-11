import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePacientesComponent } from './table-pacientes.component';

describe('TablePacientesComponent', () => {
  let component: TablePacientesComponent;
  let fixture: ComponentFixture<TablePacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePacientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
