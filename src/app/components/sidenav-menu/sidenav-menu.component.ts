import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {

  currentUrl: string;
  constructor( private router: Router) {
    router.events.subscribe( event => {
      if(event instanceof NavigationEnd){
        this.onRouterChange();
      }
    })
  }

  ngOnInit(){
    this.onRouterChange();
  }

  onRouterChange() {
    this.currentUrl = this.router.url;
  }

  navigate(route: string){
    this.router.navigateByUrl(route);
  }

}
