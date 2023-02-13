import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should be able to validate the filter form`, () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()

    let id = app.filterForm.controls['id']
    let text = app.filterForm.controls['texto']

    id.setValue('23')
    text.setValue('tueirjhud')
    expect(app.filterForm.valid)
  });

  it(`The component must be instantiated`, () => {
    expect(component).toBeDefined();
    expect(component).toBeInstanceOf(IndexComponent);
  });

  it(`should be able to load items in the first few seconds`, () => {
    component.generateJSONArray();
    setTimeout(() => {
      expect(component.elements.length).toBe(5);
    }, 2000);
  });

  it(`generate random text`, () => {
    expect(component.randomTextGenerator()).not.toBe('');
  });

  it(`generate new URL`, () => {
    expect(component.changeUrl('2')).not.toBe('');
  });

  it(`the clrear filters button should clrear the text fields`, () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()

    let id = component.filterForm.controls['id']
    let text = component.filterForm.controls['texto']

    id.setValue('23')
    text.setValue('prueba')
    component.borrarFiltros()

    expect(component.filterForm.controls['id'].value).toBe(null)
    expect(component.filterForm.controls['texto'].value).toBe(null)


  });

  it(`When filtering it should return data if it exists`, () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()
    component.generateJSONArray()
    let id = component.filterForm.controls['id']
    id.setValue('2')
    component.filtrar()
    expect(component.filteredElements).not.toBe({} || null || undefined)
  });

  it(`When filtering it should not return data if it exists`, () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()
    component.generateJSONArray()
    let id = component.filterForm.controls['id']
    id.setValue('0')
    component.filtrar()
    expect(component.filteredElements).toEqual([])
  });

  it(`text & id is empty in filter`, () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()
    let id = component.filterForm.controls['id'];
    let texto = component.filterForm.controls['texto'];
    id.setValue(null)
    texto.setValue(null)
    component.filtrar()
    expect(component.showEmptyResults).toBe(false);
  });

  it(`all fields working`, () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()
    let id = component.filterForm.controls['id'];
    let texto = component.filterForm.controls['texto'];
    id.setValue("23");
    texto.setValue("a");
    component.filtrar();
    setTimeout(() => {
      expect(component.showEmptyResults).toBe(false);
    }, 500);
  });

  it(`pageSlice && totalItems have a value`, () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    component.generateJSONArray();
    setTimeout(() => {
    expect(component.pageSlice).not.toBe(null);
    expect(component.totalItems > 10);
    }, 500);
  });

  it(`onChangePagen working with type Initial`, () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const e = {
      "previousPageIndex": 0,
      "pageIndex": 1,
      "pageSize": 10,
      "length": 4000
    }
    component.onChangePage(e, 'Initial');
    expect(component.onChangePage).not.toBe(null);
  }); 
  
  it(`onChangePagen working with other type`, () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    let id = component.filterForm.controls['id'];
    let texto = component.filterForm.controls['texto'];
    id.setValue("23");
    texto.setValue("a");
    component.filtrar();
    const e = {
      "previousPageIndex": 0,
      "pageIndex": 1,
      "pageSize": 10,
      "length": 1022
  }
    component.onChangePage(e, 'Filtered');
    setTimeout(() => {
    expect(component.onChangePage).not.toBe(null);
      
    }, 500);
  });  

});
