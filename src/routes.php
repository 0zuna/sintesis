<?php
use Slim\Http\Request;
use Slim\Http\Response;
// Routes
$app->get('/', function (Request $request, Response $response, array $args) {
	$response->getBody()->write("Welcome to my Machine");
	return $response;
});
$app->get('/{sakura}', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/' route");
    return $this->view->render($response, 'index.phtml', $args);
});
$app->get('/{sakura}/data', function (Request $request, Response $response, array $args) {
	$clienta=$args['sakura'];
	$sakura=$this->db->prepare("
			SELECT
				n.Periodico AS idPer,
				n.Titulo AS titulo,
				n.Categoria as cat,
				CONCAT('https://www.gaimpresos.com/Periodicos/',p.Nombre,'/',n.Fecha,'/',NumeroPagina) AS 'pdf'
			FROM
				noticiasDia n,
				periodicos p,
				ordenpgjcdmx o,
				seccionesPeriodicos s,
				categoriasPeriodicos c,
				estados e
			WHERE
				e.idEstado=p.Estado AND
				p.idPeriodico=n.Periodico AND
				p.idPeriodico=o.periodico AND
				s.idSeccion=n.Seccion AND
				c.idCategoria=n.Categoria AND
				c.idCategoria in(3,133) AND
				n.Activo = 1 AND
				o.posicion <= 20 AND
				p.idPeriodico IN (121,1968,244,302,315,319,32,320,326,346,47,50,51,52,53,59,97) AND
				fecha = CURDATE()
			GROUP BY n.NumeroPagina,p.idPeriodico
			ORDER BY o.posicion, n.Categoria");
	$sakura->execute();
	$columnas=$sakura->fetchAll();
	$sakura=$this->db->prepare("SELECT
		n.cutted,
		n.Periodico AS idPeriodico,
		n.idEditorial,
		n.Titulo,
		p.Nombre AS Periodico
	FROM
		noticiasDia n,
		periodicos p,
		ordenpgjcdmx o,
		seccionesPeriodicos s,
		categoriasPeriodicos c,
		estados e
	WHERE
		e.idEstado=p.Estado AND
		p.idPeriodico=n.Periodico AND
		p.idPeriodico=o.periodico AND
		s.idSeccion=n.Seccion AND
		c.idCategoria=n.Categoria AND
		n.Categoria IN (153,1,19) AND
		n.Activo = 1 AND
		fecha = CURDATE() AND
		(
			Titulo like 'Bajo Reserva' OR
			Titulo like 'Frentes Politicos' OR
			Titulo like 'Pepe Grillo' OR
			Titulo like 'Linea 10' OR
			Titulo like 'Confidencial' OR
			Titulo like 'Sacapuntas' OR
			Titulo like 'La esquina' OR
			Titulo like 'Jaque Mate' OR
			Titulo like 'El Asalto a la Razon' OR
			Titulo like 'En Privado' OR
			Titulo like 'Agenda Confidencial' OR
			Titulo like 'Balas Perdidas' OR
			Titulo like 'Circuito Interior' OR
			Titulo like 'Rozones' OR
			Titulo like 'Capital Politico' OR
			Titulo like 'La creme de la creme' OR
			Titulo like 'Mirando al Otro lado' OR
			#Titulo like 'Contra las Cuerdas' OR
			Titulo like 'Cristalazo Semanal' OR
			Titulo like 'ContraLuz' OR
			Titulo like 'Acceso Libre' OR
			#Titulo like 'Abc Dice' OR
			Titulo like 'Red Compartida' OR
			#Titulo like 'De politica y cosas peores' OR
			Titulo like 'El Caballito' OR
			Titulo like 'Gente como Uno' OR
			Titulo like 'Cronicas Urbanas'
		)
	GROUP BY n.idEditorial
	ORDER BY o.id");
	$sakura->execute();
	$opinion=$sakura->fetchAll();
	$sakura=$this->db->prepare("SELECT
			n.idEditorial,
#			n.Periodico AS 'idPeriodico',
			p.String_Name AS 'Periodico',
#n.Fecha,
#			n.Titulo,
#			n.Seccion AS 'idSeccion',
#			s.seccion AS 'Seccion',
#			n.PaginaPeriodico,
#			n.Texto,
#			CONCAT('/Periodicos/',p.Nombre,'/',n.Fecha,'/',NumeroPagina) AS 'pdf',
			CONCAT(n.idEditorial,'_cut_1.png') AS 'png'
		FROM
			noticiasDia n,
			ordenGeneral o,
			periodicos p,
			seccionesPeriodicos s
		WHERE
			n.Periodico=o.periodico AND
			n.Periodico=p.idPeriodico AND
			n.Periodico IN(50,32,59,51,53,302,346,319,97,1968,47,320,121,271,315,244) AND
			n.Categoria=18 AND
			s.idSeccion = n.Seccion AND
			p.Estado=9 AND n.Fecha=CURDATE() AND
			n.cutted=1
		GROUP BY p.idPeriodico, n.NumeroPagina
		ORDER BY o.posicion, p.idPeriodico");
	$sakura->execute();
	$cartoons=$sakura->fetchAll();
	$sakura=$this->db->prepare("select text,query from boards 
			inner join menus on boards.id=menus.board_id 
			inner join menu_items on menus.id=menu_items.menu_id
			where menu_items.type='sql' and alias='$clienta' and menu_items.enabled=1 and menus.position='left'");
	$sakura->execute();
	$sintesis=$sakura->fetchAll();
	foreach ($sintesis as $k=>$value){
		if($value['query']!=''){
			$sakura=$this->db->prepare($value['query']);
			$sakura->execute();
			$sintesis[$k]['data']=$sakura->fetchAll();
			unset($sintesis[$k]['query']);
		}
	}
	foreach ($opinion as $k=>$value) {
		$opinion[$k]['Titulo']=strtolower(str_replace(
			['Á', 'É', 'Í', 'Ó', 'Ú','á', 'é', 'í', 'ó', 'ú'],
			['a', 'e', 'i', 'o', 'u','a', 'e', 'i', 'o', 'u'],
			$opinion[$k]['Titulo']
		));
		$path="../public/assets/img/opinion/".$opinion[$k]['Titulo'].".jpg";
		$type = pathinfo($path, PATHINFO_EXTENSION);
		$data = file_get_contents($path);
		$opinion[$k]['image'] = 'data:image/' . $type . ';base64,' . base64_encode($data);
	}
	foreach ($columnas as $k=>$value) {
		$path="../public/assets/img/".$value['idPer'].".png";
		$type = pathinfo($path, PATHINFO_EXTENSION);
		$data = file_get_contents($path);
		$columnas[$k]['image'] = 'data:image/' . $type . ';base64,' . base64_encode($data);
	}
	foreach ($cartoons as $k=>$value) {
		$path="../public/assets/cuts/".$value['png'];
		$type = pathinfo($path, PATHINFO_EXTENSION);
		$data = file_get_contents($path);
		$cartoons[$k]['image'] = 'data:image/' . $type . ';base64,' . base64_encode($data);
		
		/*$img_url = 'http://192.168.3.154/siscap.la/public/img/cuts/'.$value['png'];
		$b64_url = 'php://filter/read=convert.base64-encode/resource='.$img_url;
		$b64_img = file_get_contents($b64_url);
		$cartoons[$k]['image'] = 'data:image/png;base64,' . $b64_img;*/
	}
	return json_encode(['columnas'=>$columnas,'opinion'=>$opinion,'cartoons'=>$cartoons,'sintesis'=>$sintesis]);
});

