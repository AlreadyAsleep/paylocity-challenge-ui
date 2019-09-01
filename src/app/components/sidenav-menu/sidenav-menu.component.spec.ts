import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMenuComponent } from './sidenav-menu.component';
import { MaterialModule } from 'src/app/modules/material-module';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { of, Subject } from 'rxjs';

describe('SidenavMenuComponent', () => {
  let component: SidenavMenuComponent;
  let fixture: ComponentFixture<SidenavMenuComponent>;
  let router: RouterStub;

  class RouterStub {
    public url;
    private subject = new Subject();
    public events = this.subject.asObservable();
  
    navigateByUrl(url: string) {
      this.url = url;
      this.triggerNavEvents(url);
    }
  
    triggerNavEvents(url) {
      let ne = new NavigationEnd(0, url, null);
      this.subject.next(ne);
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavMenuComponent ],
      imports:[
        MaterialModule,
      ],
      providers: [
        {provide: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMenuComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask the router to navigate to the requested url', () => {
    let testRoute = 'dashboard';
    component.navigate(testRoute);
    expect(router.url === testRoute).toBeTruthy();
  });

  it('should get the correct url back from the router', () => {
    let testRoute = 'dashboard';
    component.navigate(testRoute);
    expect(component.currentUrl === testRoute).toBeTruthy();
  });
});
