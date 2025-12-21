
// imports
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// import pdf config
import { pdfConfig } from '@config/PDF.config';

// import interfaces
import { PDFGenerationDTO } from '@DTOs/ExportHistory.dtos';


// pdf service - class
class PDFService {

   public async pdfGeneration(
      data: PDFGenerationDTO
   ): Promise<string> {
      // ensure output directory exists
      const outputDir = path.resolve(pdfConfig.outputDir);
      if (!fs.existsSync(outputDir)) {
         fs.mkdirSync(outputDir, { recursive: true });
      }

      // file name
      const fileName = `export-${Date.now()}.pdf`;
      const filePath = path.join(outputDir, fileName);

      // pdf instance
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // metadata
      doc.info.Title = pdfConfig.meta.title;
      doc.info.Author = pdfConfig.meta.author;
      doc.info.Subject = pdfConfig.meta.subject;

      /* =========================
         HEADER
      ========================= */
      doc
         .fontSize(20)
         .fillColor(pdfConfig.styles.headerColor)
         .text(pdfConfig.meta.title, { align: 'center', underline: true });

      doc.moveDown(0.5);
      doc
         .fontSize(10)
         .fillColor(pdfConfig.styles.greyColor)
         .text(
            `Data de geração: ${new Date().toLocaleDateString('pt-BR')}`,
            { align: 'center' }
         );

      doc.moveDown(1.5);
      doc
         .moveTo(50, doc.y)
         .lineTo(550, doc.y)
         .strokeColor(pdfConfig.styles.accentColor)
         .lineWidth(0.5)
         .stroke();

      doc.moveDown(2);

      /* =========================
         USER DATA
      ========================= */
      doc
         .fontSize(14)
         .fillColor(pdfConfig.styles.accentColor)
         .text('Dados do Usuário');

      doc.moveDown(1);

      doc
         .fontSize(11)
         .fillColor(pdfConfig.styles.blackColor)
         .text(`Nome: ${data.user_data.name}`)
         .text(`Residência: ${data.user_data.residence_name}`)
         .text(`Número de moradores: ${data.user_data.number_of_residents}`);

      doc.moveDown(2);

      /* =========================
         TARIFFS
      ========================= */
      doc
         .fontSize(14)
         .fillColor(pdfConfig.styles.accentColor)
         .text('Tarifas Configuradas');

      doc.moveDown(1);

      doc
         .fontSize(11)
         .fillColor(pdfConfig.styles.blackColor)
         .text(`Energia: R$ ${Number(data.user_tariffs.energy_tariff).toFixed(2)} / kWh`)
         .text(`Água: R$ ${Number(data.user_tariffs.water_tariff).toFixed(2)} / m³`)
         .text(`Gás: R$ ${Number(data.user_tariffs.gas_tariff).toFixed(2)} / m³`);

      doc.moveDown(2);

      /* =========================
         MONTHLY CONSUMPTIONS
      ========================= */
      doc
         .fontSize(14)
         .fillColor(pdfConfig.styles.accentColor)
         .text('Histórico Mensal de Consumo');

      doc.moveDown(1);

      data.user_month_consumptions.forEach(consumption => {
         doc
            .fontSize(11)
            .fillColor(pdfConfig.styles.blackColor)
            .text(
               `${consumption.month}/${consumption.year} — ` +
               `Energia: ${consumption.energy_kwh} kWh | ` +
               `Água: ${consumption.water_m3} m³ | ` +
               `Gás: ${consumption.gas_m3} m³`
            );
      });

      doc.moveDown(3);

      /* =========================
         FOOTER
      ========================= */
      doc
         .fontSize(9)
         .fillColor(pdfConfig.styles.lightGreyColor)
         .text(
            'Documento gerado automaticamente pelo sistema Economiza+.',
            { align: 'center', oblique: true }
         );

      // end PDF
      doc.end();

      // wait stream finish
      return new Promise((resolve, reject) => {
         stream.on('finish', () => resolve(filePath));
         stream.on('error', reject);
      });      
   };

};
export const pdfService: PDFService = new PDFService();