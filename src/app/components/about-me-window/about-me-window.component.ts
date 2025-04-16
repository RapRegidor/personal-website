import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren,  } from '@angular/core';
import { OpeningFilesService } from '../../services/opening-files.service';
import { ToggleModeService } from '../../services/toggle-mode.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me-window',
  imports: [CommonModule],
  templateUrl: './about-me-window.component.html',
  styleUrl: './about-me-window.component.css'
})
export class AboutMeWindowComponent implements AfterViewInit{
  isDarkMode$!: Observable<boolean>;
  constructor(public fileService: OpeningFilesService, private themeService: ToggleModeService){
    this.isDarkMode$ = this.themeService.isDarkMode$;
  }
  openFile(file: string){
    this.fileService.openFile(file);
  }
  changeCurrentFile(file: string){
    this.fileService.changeCurrentFile(file);
  }
  @ViewChild('container') container!: ElementRef;
  @ViewChild('welcomeContainer') destination!: ElementRef;
  scrollDown(){
    this.container.nativeElement.scroll({
      top: this.destination.nativeElement.offsetTop - 50,
      behavior: 'smooth'
    })
  }

  @ViewChild('banner') banner!: ElementRef;
  @ViewChild('bannerWrapper') bannerWrapper!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('description') desc!: ElementRef;
  @ViewChild('button') button!: ElementRef;
  @ViewChildren('animated') elements!: QueryList<ElementRef>;
  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const isSmallWidth = window.innerWidth < 1000;
        const isSmallHeight = window.innerHeight < 500;
        if (!isSmallWidth && !isSmallHeight) {
          entry.target.classList.toggle('animate', entry.isIntersecting);
          if(entry.isIntersecting && entry.target){
            observer.unobserve(entry.target);
          }
        }
      });
    }, { 
      threshold: 0.2 
    });

    this.elements.forEach(el => observer.observe(el.nativeElement));

    const bannerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const isSmallWidth = window.innerWidth < 1000;
        const isSmallHeight = window.innerHeight < 500;
        const ratio = entry.intersectionRatio;
        if (!isSmallWidth && !isSmallHeight) {
          this.bannerWrapper.nativeElement.style.filter = `blur(${(1 - ratio) * 4}rem)`;
          this.bannerWrapper.nativeElement.style.opacity = ratio;
        } else {
          this.bannerWrapper.nativeElement.style.filter = 'none';
          this.bannerWrapper.nativeElement.style.opacity = 1;
        }
        
      });
    }, {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100)
    });

    bannerObserver.observe(this.bannerWrapper.nativeElement);

    const resizeObserver = new ResizeObserver(() => {
      const width = this.banner.nativeElement.offsetWidth;
      const nameFontSize = Math.max(52, Math.min(width * 0.06, 90))
      const descFontSize = Math.max(12, Math.min(width * 0.016, 20));
      this.name.nativeElement.style.fontSize = `${nameFontSize}px`;
      this.desc.nativeElement.style.fontSize = `${descFontSize}px`;
      this.button.nativeElement.style.fontSize = `${descFontSize}px`;
    });
    
    resizeObserver.observe(this.banner.nativeElement);
  }

  @HostListener('window:resize')
  handleResize(){
    if(window.innerWidth < 1000 || window.innerHeight < 500){
      this.elements.forEach(el => {
        const elem = el.nativeElement as HTMLElement;
        elem.classList.remove('animate', 'before-left', 'before-right', 'before-up');
      });
    }
  }
  
}
