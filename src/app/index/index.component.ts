import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  elements: any;
  show: boolean = false;
  filterForm: FormGroup = new FormGroup({});
  filteredElements: any = {};
  filtered: boolean = false;
  totalItems: any;
  pageSlice: any;
  pageFilteredSlice: any;
  showEmptyResults: boolean = false;
  totalFilteredItems: any;

  constructor() { }

  ngOnInit(): void {
    this.generateJSONArray();
    this.generateForm();
  }

  generateForm() {
    this.filterForm = new FormGroup({
      id: new FormControl(''),
      texto: new FormControl(''),
    });
  }


  generateJSONArray() {
    let jsonArray: any = { elements: [] };
    for (let i = 1; i < 4001; i++) {
      setTimeout(() => {
        jsonArray.elements.push({
          "id": i,
          "photo": this.changeUrl(String(i)),
          "text": this.randomTextGenerator()
        });
      }, 1000);

    }
    this.elements = jsonArray.elements;
    setTimeout(() => {
      this.pageSlice = this.elements.slice(0, 10);
      this.totalItems = this.elements.length;
    }, 2000);


  }

  filtrar() {
    this.filteredElements = [];
    let id = this.filterForm.controls.id.value;
    let text = this.filterForm.controls.texto.value;

    let filterId = this.elements.filter((e: any) => {
      return e.id == id;
    })

    let filterText = this.elements.filter((e: any) => {
      let elementText = String(e.text);
      return elementText.includes(text);
    })

    if (filterId?.length > 0 && id?.length > 0) {
      this.filteredElements = filterId;
      this.filtered = true;
    }

    if (filterText?.length > 0 && text?.length > 0) {
      this.filteredElements = filterText;
      this.filtered = true;
    }
    if (text?.length > 0 && id?.length > 0) {
      this.filteredElements = filterText.concat(filterId);
      this.filtered = true;
    }
    
    this.filteredElements.length == undefined || this.filteredElements.length == 0  ? this.showEmptyResults = true : this.showEmptyResults = false;
    if(this.filteredElements.length > 0){
      this.pageFilteredSlice = this.filteredElements.slice(0, 10);
      this.totalFilteredItems = this.filteredElements.length;
    }

    if(!id && !text){
      this.borrarFiltros();
      this.showEmptyResults = false;
    }

  }

  onChangePage(e: any, type:string) {
    const startIndex = e.pageIndex * e.pageSize;
    let endIndex = startIndex + e.pageSize;
    
    if(type == "Initial"){
      if (endIndex > this.elements.length) {
        endIndex = this.elements.length;
      }
      return this.pageSlice = this.elements.slice(startIndex, endIndex);
    }
    else {
      if (endIndex > this.filteredElements.length) {
        endIndex = this.filteredElements.length;
      }
      return this.pageFilteredSlice = this.filteredElements.slice(startIndex, endIndex);
    }
  }

  borrarFiltros() {
    this.filterForm.reset();
    this.filtered = false;
    this.showEmptyResults = false;
  }

  changeUrl(id: string) {
    return "https://picsum.photos/id/" + id + "/500/500";
  }

  randomTextGenerator() {
    let text = Math.random().toString(36).substring(2, 20);
    return text;
  }

}
