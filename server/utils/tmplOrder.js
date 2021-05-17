let tmplOrder =  {
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
          if (rowIndex === 0) {
            return '#333333'
          }else if (rowIndex % 2 === 0) {
            return '#eeeeee'
          }else {
            return null
          }
        }
      }
    }
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 0],
      alignment: 'center'
    },
    subheader: {
      fontSize: 14,
      bold: false,
      margin: [0, 5, 0, 10],
      alignment: 'center'
    },
    tableExample: {
      fontSize: 10,
      margin: [0, 5, 0, 15],
      alignment:'center'
    },
    th: {
      bold: true,
      color: '#ffffff',
      alignment:'center'
    }
  },
  defaultStyle: {
    font: 'fzlt'
  },
  pageOrientation: 'landscape',
}


module.exports = tmplOrder;