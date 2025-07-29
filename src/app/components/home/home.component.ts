import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">Full Sustainable<br>Cargo Solution</h1>
            <p class="hero-subtitle">
              We Continue To Pursue That Same Vision In Today's Complex,<br>
              Uncertain World, Working Every Day To Earn Our Customers'
            </p>
            <div class="hero-buttons">
              <button class="btn btn-primary">Get Started</button>
              <button class="btn btn-secondary">
                <span class="play-icon">▶</span>
                Watch more
              </button>
            </div>
          </div>
          <div class="hero-illustration">
            <div class="warehouse"></div>
            <div class="truck truck-1"></div>
            <div class="truck truck-2"></div>
            <div class="worker worker-1"></div>
            <div class="worker worker-2"></div>
            <div class="packages"></div>
            <div class="forklift"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Clients Section -->
    <section class="clients-section">
      <div class="container">
        <h2 class="clients-title">Over <span class="highlight">17,000 Clients</span> All Over The World</h2>
        <div class="clients-logos">
          <div class="client-logo">umbrella</div>
          <div class="client-logo">Product.</div>
          <div class="client-logo">Colab</div>
          <div class="client-logo">Leafe</div>
          <div class="client-logo">umbrella</div>
          <div class="client-logo">Greenish</div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <h2 class="section-title">We Provide Safe And<br>Reliable Cargo Solutions</h2>
        <div class="services-grid">
          <div class="service-card" *ngFor="let service of services">
            <div class="service-icon" [innerHTML]="service.icon"></div>
            <h3>{{ service.title }}</h3>
            <div class="service-arrow">→</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Logistics Solutions Section -->
    <section class="logistics-section">
      <div class="container">
        <div class="logistics-content">
          <div class="logistics-text">
            <h2>Safe Reliable<br>Logistic Solutions</h2>
            <p>
              Road Transportation Has A Crucial Role.<br>
              Coordinated Transportation In The<br>
              Countries Of Origin Destination Makes<br>
              All The Difference.
            </p>
            <button class="btn btn-primary">Learn More →</button>
          </div>
          <div class="logistics-illustration">
            <div class="big-truck"></div>
            <div class="logistics-worker"></div>
            <div class="cargo-boxes"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial Section -->
    <section class="testimonial-section">
      <div class="container">
        <div class="testimonial-card">
          <div class="testimonial-content">
            <p class="testimonial-text">
              Cursus Congue Tortor Turpis Faucibus Sollicitudin Diam Massa Accumsan Egestas 
              Habitant Ut Placerat Nascetur Sed Lorem Ipsum Dolor Sit Amet, Consectetur 
              Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna 
              Aliqua Consectetur Volutpat Consequat Duis
            </p>
            <div class="testimonial-author">
              <div class="author-avatar">D</div>
              <div class="author-info">
                <h4>Disney Company</h4>
                <div class="rating">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="features-section">
    <div class="container">
    <div class="features-content">
          <div class="features-text">
            <h2>Why choose us<br>for your service</h2>
            <p>
              Cursus Congue Tortor Turpis Faucibus<br>
              Sollicitudin Diam Massa Accumsan Egestas<br>
              Habitant Ut Placerat Nascetur Sed
            </p>
            <button class="btn btn-primary">Learn More</button>
          </div>
          <div class="features-grid">
          <div class="feature-item" *ngFor="let feature of features">
          <div class="feature-icon" [innerHTML]="feature.icon"></div>
          <div class="feature-content">
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Emergency Solutions Section -->
    <section class="emergency-section">
  
  
  
    <img #droneImage src="2.jpg" class="drone" alt="Drone" />
  
  
  
    <div class="container">
        <div class="emergency-content">
          <div class="emergency-text">
            <div class="emergency-heading">
              <h4>Emergency</h4>
              <h4 class="left-heading">solution</h4>
              <h4>for delivery</h4>
            </div>
            <p class="emergency-subtitle">
              Aliquam Porta Nisl Dolor, Molestie<br>
              Pellentesque Est Molestie In, Morbi<br>
              Metus Neque, Elementum<br>
              Ullamcorper Molestie
            </p>
            </div>
            <div class="text-box">
            <ul class="emergency-features drone-delivery">
              <li>— Fastest Transit Times</li>
              <li>— Security And Protection</li>
              <li>— Safe Packaging</li>
              <li>— Guaranteed Delivery</li>
            </ul>
          </div>

         
        </div>
      </div>
    </section>

    <!-- Floating Quote Button -->
    <div class="floating-quote-btn">
      <button class="quote-btn">Get a Quote</button>
    </div>

    <app-footer></app-footer>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('droneImage') droneImage!: ElementRef;
  @ViewChild('heroText') heroText!: ElementRef;


ngAfterViewInit() {
  gsap.fromTo(
    this.droneImage.nativeElement,
    { x: 1000, y: -400, opacity: 0 },
    {
      x: -200,
      y: 50,
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: this.droneImage.nativeElement,
        start: 'top 80%',  // when the top of the element hits 80% of viewport
        toggleActions: 'play none none reverse' // play on enter, reverse on leave
      }
    }
  );

  gsap.fromTo(
    this.heroText.nativeElement,
    { opacity: 0, y: 10 },
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      delay: 0.2,
      scrollTrigger: {
        trigger: this.heroText.nativeElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );
}





  services = [
    {
      title: 'Road\nTransportation',
      icon: '<div class="truck-icon"></div>'
    },
    {
      title: 'Ocean\nFreight',
      icon: '<div class="ship-icon"></div>'
    },
    {
      title: 'Air\nFreight',
      icon: '<div class="plane-icon"></div>'
    },
    {
      title: 'Drone\nParcel Delivery',
      icon: '<div class="drone-icon"></div>'
    }
  ];

  features = [
    {
      title: 'Online Support',
      description: 'Aliquam Porta Nisl Dolor,\nOlestie Pellentesque Est\nMolestie In.',
      icon: '<div class="support-icon"></div>'
    },
    {
      title: 'Order Tracking',
      description: 'Aliquam Porta Nisl Dolor,\nOlestie Pellentesque Est\nMolestie In.',
      icon: '<div class="tracking-icon"></div>'
    },
    {
      title: 'Drone Delivery',
      description: 'Aliquam Porta Nisl Dolor,\nOlestie Pellentesque Est\nMolestie In.',
      icon: '<div class="delivery-icon"></div>'
    },
    {
      title: 'Cost Save',
      description: 'Aliquam Porta Nisl Dolor,\nOlestie Pellentesque Est\nMolestie In.',
      icon: '<div class="cost-icon"></div>'
    }
  ];
}