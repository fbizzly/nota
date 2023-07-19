var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
  	user: 'root',
  	host: '51.79.188.203',
  	database: 'MPC',
  	password: 'postgres',
  	port: 5431,
  });

router.get('/layanan/:id', async function(req, res, next) {
  var param = req.params;
	var id = param.id;
  var query = `Select row_number() over () as id, product_template.name as item_service, COALESCE(pet_clinic_doctor_doctor.name, 'Kosong') as doctor, pet_clinic_service.amount, pet_clinic_service.price, COALESCE(pet_clinic_service.fixed_price, 0) as fixed_price
                from pet_clinic_service 
                left join pet_clinic_visitation on pet_clinic_visitation.id = pet_clinic_service.visitation
                left join pet_clinic_doctor as pet_clinic_doctor_doctor on pet_clinic_doctor_doctor.id = pet_clinic_service.doctor 
                left join product_product on product_product.id = pet_clinic_service.item_service 
                left join product_template on product_template.id = product_product.product_tmpl_id
                where pet_clinic_visitation.visitation_id = '${id}'`
  const client = await pool.connect();
  const result = await client.query(query);
  const userData = result.rows;
  client.release();
  res.send(userData)
});

router.get('/so/:id', async function(req, res, next) {
  var param = req.params;
	var id = param.id;
  var query = `select row_number() over () as id, product_template.name as item_service, sale_order_line.product_uom_qty as amount, sale_order_line.price_unit as fixed_price, sale_order_line.price_total as price
                from sale_order_line
                left join sale_order on sale_order.id = sale_order_line.order_id
                left join pet_clinic_visitation on pet_clinic_visitation.id = sale_order.pet_visitation_sale
                left join product_product on product_product.id = sale_order_line.product_id 
                left join product_template on product_template.id = product_product.product_tmpl_id
                where pet_clinic_visitation.visitation_id = '${id}'`
  const client = await pool.connect();
  const result = await client.query(query);
  const userData = result.rows;
  client.release();
  res.send(userData)
});

router.get('/user/:id', async function(req, res, next) {
  var param = req.params;
	var id = param.id;
  var query = `select  pet_clinic_client.name, CONCAT(pet_clinic_kota.kab_kota, ', ', pet_clinic_client.village, ', ', pet_clinic_client.street, ' ', pet_clinic_client.zip) as alamat, pet_clinic_client.phone, pet_clinic_pet.name as pet
                from pet_clinic_visitation
                left join pet_clinic_client on pet_clinic_client.id = pet_clinic_visitation.owner
                left join pet_clinic_pet on pet_clinic_pet.id = pet_clinic_visitation.pet
                left join pet_clinic_kota on pet_clinic_kota.id = pet_clinic_client.city
                where pet_clinic_visitation.visitation_id = '${id}'`
  const client = await pool.connect();
  const result = await client.query(query);
  const userData = result.rows;
  client.release();
  res.send(userData)
});

module.exports = router;
