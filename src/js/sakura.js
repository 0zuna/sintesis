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
			color: 'black',
			bold: false,
			alignment: 'center',
		 },
		{
			stack:[
				'',
				{text: '', style: {color: 'black',fontSize:50}},
			],
			style: {
				fontSize: 40,
				alignment: 'center',
			},
			margin: [0, 160, 0, 0],
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
