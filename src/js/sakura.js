const dias = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
const f=new Date();
const fecha=dias[f.getDay()]+" "+f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear()

module.exports = {
	cover: [
		{
		image: '',
		width: 510,
		//absolutePosition:{x:0,y:0}
		},
		 {
			text:fecha,
			fontSize: 15,
			color: 'white',
			bold: true,
			absolutePosition:{x:253,y:100},
		 },
		{
			stack:[
				'',
				{text: '', style: {color: 'black',bold:false}},
			],
			style: {
				fontSize: 12,
				bold: true,
				alignment: 'center',
			},
			margin: [0, 20, 0, 0],
		},
	],
	columns: [
		{
		image: '',
		width: 530,
		margin:[0,0,0,20],
		},
		{table: {
			widths: ['*', 400],
			body: []
			},
		pageBreak: ''
		}
	],
	opinion:[
		{
			image: '',
			width: 530,
			margin:[0,0,0,20],
		}
	],
	cartoons:[
		{
			image: '',
			width: 530,
			margin:[0,0,0,20],
		}
	]
}
