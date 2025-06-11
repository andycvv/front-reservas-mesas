import * as pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';
import { LOGO_BASE64 } from './logo-base64';

export interface ReservaReporte {
  reservasPorDia: { [dia: string]: number };
  totalReservas: number;
  promedioDiario: number;
  cancelaciones: number;
  numeroDeDias: number;
}

export function generarReportePdf(
  reporte: ReservaReporte,
  diasDeLaSemana: string[],
  fechaInicio: Date,
  fechaFin: Date
): void {
  const body: any[] = [
    [
      { text: 'Día', style: 'tableHeader' },
      { text: 'Cantidad de Reservas', style: 'tableHeader' }
    ]
  ];

  for (const dia of diasDeLaSemana) {
    const cantidad = reporte.reservasPorDia[dia] || 0;
    body.push([
      { text: dia, style: 'tableCell' },
      { text: cantidad.toString(), style: 'tableCell' }
    ]);
  }

  const docDefinition: any = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],

    content: [
      {
        image: LOGO_BASE64,
        width: 100,
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      { text: 'Reporte de Reservas', style: 'header' },
      {
        text: `Rango de fechas: ${fechaInicio.toLocaleDateString()} - ${fechaFin.toLocaleDateString()}`,
        style: 'subheader',
        margin: [0, 0, 0, 20]
      },

      {
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          body: body
        },
        layout: {
          fillColor: (rowIndex: number) => rowIndex === 0 ? '#eeeeee' : null,
          hLineColor: () => '#cccccc',
          vLineColor: () => '#cccccc',
        }
      },

      {
        text: 'Resumen General',
        style: 'sectionTitle',
        margin: [0, 30, 0, 10]
      },

      {
        columns: [
          { text: `Total de reservas:`, width: '25%', bold: true },
          { text: reporte.totalReservas, alignment: 'left' }
        ],
        margin: [0, 10, 0, 10]
      },

      {
        columns: [
          { text: `Cancelaciones: `, width: '25%', bold: true },
          { text: reporte.cancelaciones, alignment: 'left' }
        ],
        margin: [0, 10, 0, 10]
      },

      {
        columns: [
          { text: `Número de días: `, width: '25%', bold: true },
          { text: reporte.numeroDeDias, alignment: 'left' }
        ],
        margin: [0, 10, 0, 10]
      },
    ],

    styles: {
      header: {
        fontSize: 20,
        bold: true,
        alignment: 'center',
        color: '#2c3e50',
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 12,
        alignment: 'center',
        color: '#555555'
      },
      sectionTitle: {
        fontSize: 16,
        bold: true,
        color: '#34495e'
      },
      tableHeader: {
        bold: true,
        fillColor: '#2980b9',
        color: 'white',
        fontSize: 12,
        alignment: 'center'
      },
      tableCell: {
        margin: [0, 4, 0, 4],
        fontSize: 11,
        alignment: 'center'
      },
      summaryText: {
        fontSize: 12,
        margin: [0, 0, 0, 10]
      }
    }
  };

  pdfMake.createPdf(docDefinition).open(); // O puedes usar `.download('reporte.pdf')`
}
