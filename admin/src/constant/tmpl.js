export var tmpl =  {
  content: [
    {text: '浙江艾尔森环保科技有限公司', style: 'header'},
    {text: '除醛服务预约清单', style:'subheader'},
    {
      style: 'tableExample',
      table: {
        headerRows: 1,
        body: []
      },
      layout: {
        fillColor: function (rowIndex, node, columnIndex) {
          return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
        }
      }
    }
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10],
      alignment: 'center',
      background: '#333333',
      color: '#ffffff'
    },
    subheader: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 5],
      alignment: 'center'
    },
    tableExample: {
      fontSize: 12,
      margin: [0, 5, 0, 15]
    },
    th: {
      bold: true,
      fontSize: 12,
      color: 'black'
    }
  },
  defaultStyle: {
    font: 'fzlt',
    fontSize: 12,
  }
}


  
