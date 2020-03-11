import { Router, Request, Response } from 'express'

import { conex } from "../classes/server";

const router = Router();


//Mantenedores

router.get('/obras', 

    function(req: Request ,res: Response) {
        
        const query = "SELECT * FROM OBRAS";
    
        conex.query(query, function(err:any, rows:any, fields:any) {
        if (err) throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});

router.get('/obras/:id', 

    function(req: Request ,res: Response) {
        
        const query = "SELECT * FROM OBRAS WHERE ID = '" + req.params.id + "' ";
    
        conex.query(query, function(err:any, rows:any, fields:any) {
        if (err) throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});


router.get('/operarios', 

    function(req: Request ,res: Response) {
        
        const query = "SELECT * FROM OPERARIOS";
    
        conex.query(query, function(err:any, rows:any, fields:any) {
        if (err) throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});

router.get('/operarios/:id', 

    function(req: Request ,res: Response,) {
    
    const query = "SELECT * FROM operarios WHERE id = '" + req.params.id + "' ";

    console.log('query ->', query);
    
    conex.query(query, function(err:any, rows:any, fields:any) {
        if (err) throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});

router.post('/obras', 

    function(req: Request ,res: Response,) {
    
    console.log('body de imprimir', req.body);
    const query = "INSERT INTO OBRAS (CODIGO, OBRANAME, FECHAINI, RESPONSABLE, REGION, COMUNA, DIRECCION,ESTADO) VALUES ('" + req.body.codigo + "', '" + req.body.obraname + "', '" + req.body.fechaINI + "', '" + req.body.responsable + "', '" + req.body.region + "', '" + req.body.comuna + "', '" + req.body.direccion + "', '" + req.body.estado + "')";

    console.log('query ->', query);
    
    conex.query(query, function(err:any, rows:any, fields:any) {
        if (err) throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});







router.get('/test', function(req, res) {
    res.json({ resultado: 'ok', datos: 'funciona' });
})    

 

  


export default router;