import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerPageRoutingModule } from './scanner-routing.module';

import { ScannerPage } from './scanner.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [    
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPageRoutingModule,
    ComponentsModule,
    NgxQRCodeModule
  ],
  declarations: [ScannerPage]
})
export class ScannerPageModule {}
