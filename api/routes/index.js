var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
  	user: 'postgres',
  	host: '127.0.0.1',
  	database: 'RAP',
  	password: 'postgres',
  	port: 5432,
  });

router.get('/order/:id', async function(req, res, next) {
  var param = req.params;
	var id = param.id;
  var query = `select row_number() over () as id, product_template.name as item_service, pos_order_line.qty as amount, pos_order_line.price_unit as price_unit, pos_order_line.price_subtotal_incl as price
                from pos_order_line
                left join pos_order on pos_order.id = pos_order_line.order_id
                left join product_product on product_product.id = pos_order_line.product_id 
                left join product_template on product_template.id = product_product.product_tmpl_id
                where pos_order.pos_reference = '${id}'`
  const client = await pool.connect();
  const result = await client.query(query);
  const userData = result.rows;
  client.release();
  res.send(userData)
});


router.get('/outlet/:id', async function(req, res, next) {
  var param = req.params;
  var id = param.id;
  var query = `select pos_config.receipt_header, pos_config.receipt_footer, pos_config.name  from pos_order
                left join pos_session on pos_session.id = pos_order.session_id
                left join pos_config on pos_session.config_id = pos_config.id
                where pos_order.pos_reference = '${id}'`
  const client = await pool.connect();
  const result = await client.query(query);
  const userData = result.rows;
  client.release();
  res.send(userData)
});

router.get('/user/:id', async function(req, res, next) {
  var param = req.params;
  var id = param.id;
  var query = `select res_partner.name, CONCAT(rcs.name, ' ', res_partner.city, ' ', res_partner.street, ' ', res_partner.street2, '', res_partner.zip) as alamat, res_partner.phone
                from pos_order
                left join res_partner on res_partner.id = pos_order.partner_id
                left join res_country_state rcs on rcs.id = res_partner.state_id
                where pos_order.pos_reference = '${id}'`
  const client = await pool.connect();
  const result = await client.query(query);
  const userData = result.rows;
  client.release();
  res.send(userData)
});


module.exports = router;
