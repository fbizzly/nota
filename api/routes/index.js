var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
  	user: 'root',
  	host: 'ip',
  	database: 'MPC',
  	password: 'postgres',
  	port: 5431,
  });

router.get('/layanan/:id', async function(req, res, next) {
  var param = req.params;
	var id = param.id;
  // var query = `Select row_number() over () as id, product_template.name as item_service, pet_clinic_service.amount, pet_clinic_service.price, COALESCE(pet_clinic_service.fixed_price, 0) as fixed_price
  //               from pet_clinic_service 
  //               left join pet_clinic_visitation on pet_clinic_visitation.id = pet_clinic_service.visitation
  //               left join pet_clinic_doctor as pet_clinic_doctor_doctor on pet_clinic_doctor_doctor.id = pet_clinic_service.doctor 
  //               left join product_product on product_product.id = pet_clinic_service.item_service 
  //               left join product_template on product_template.id = product_product.product_tmpl_id
  //               left join product_category on product_category.id = product_template.categ_id
  //               where pet_clinic_visitation.visitation_id = '${id}' 
  //               and product_category.name = 'Vaksinasi'
  //               and product_template.type = 'service'`

  // var query2 = `Select row_number() over () as id, product_template.name as item_service, sale_order_line.product_uom_qty as amount, sale_order_line.price_unit as fixed_price, sale_order_line.price_total as price
  //               from sale_order_line
  //               left join sale_order on sale_order.id = sale_order_line.order_id
  //               left join pet_clinic_visitation on pet_clinic_visitation.id = sale_order.pet_visitation_sale
  //               left join product_product on product_product.id = sale_order_line.product_id 
  //               left join product_template on product_template.id = product_product.product_tmpl_id
  //               where pet_clinic_visitation.visitation_id = '${id}' 
  //               and product_template.name is not null`

  var query = `SELECT
                row_number() OVER () as id,
                item_service,
                amount,
                price,
                fixed_price
              FROM (
                SELECT
                  product_template.name as item_service,
                  pet_clinic_service.amount,
                  pet_clinic_service.price,
                  COALESCE(pet_clinic_service.fixed_price, 0) as fixed_price
                FROM pet_clinic_service 
                LEFT JOIN pet_clinic_visitation ON pet_clinic_visitation.id = pet_clinic_service.visitation
                LEFT JOIN pet_clinic_doctor AS pet_clinic_doctor_doctor ON pet_clinic_doctor_doctor.id = pet_clinic_service.doctor 
                LEFT JOIN product_product ON product_product.id = pet_clinic_service.item_service 
                LEFT JOIN product_template ON product_template.id = product_product.product_tmpl_id
                LEFT JOIN product_category ON product_category.id = product_template.categ_id
                WHERE pet_clinic_visitation.visitation_id = '${id}' 
                  AND product_category.name = 'Vaksinasi'
                  AND product_template.type = 'service'

                UNION ALL

                SELECT
                  product_template.name as item_service,
                  sale_order_line.product_uom_qty as amount,
                  sale_order_line.price_unit as fixed_price,
                  sale_order_line.price_total as price
                FROM sale_order_line
                LEFT JOIN sale_order ON sale_order.id = sale_order_line.order_id
                LEFT JOIN pet_clinic_visitation ON pet_clinic_visitation.id = sale_order.pet_visitation_sale
                LEFT JOIN product_product ON product_product.id = sale_order_line.product_id 
                LEFT JOIN product_template ON product_template.id = product_product.product_tmpl_id
                WHERE pet_clinic_visitation.visitation_id = '${id}' 
                  AND product_template.name IS NOT NULL
                  AND product_template.type = 'service'
              ) AS combined_result;`
  const client = await pool.connect();
  const result = await client.query(query);
  const userData = result.rows;
  client.release();

  // const client2 = await pool.connect();
  // const result2 = await client2.query(query2);
  // const userData2 = result2.rows;
  // client2.release();
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
                where pet_clinic_visitation.visitation_id = '${id}' 
                and product_template.type != 'service'
                and product_template.name is not null`
  const client = await pool.connect();
  const result = await client.query(query);
  const userData = result.rows;
  client.release();
  res.send(userData)
});

router.get('/user/:id', async function(req, res, next) {
  var param = req.params;
	var id = param.id;
  var query = `select pet_clinic_client.name, CONCAT(pet_clinic_kota.kab_kota, ', ', pet_clinic_client.village, ', ', pet_clinic_client.street, ' ', pet_clinic_client.zip) as alamat, pet_clinic_client.phone, pet_clinic_pet.name as pet
                from pet_clinic_visitation
                left join pet_clinic_client on pet_clinic_client.id = pet_clinic_visitation.owner
                left join pet_clinic_pet on pet_clinic_pet.id = pet_clinic_visitation.pet
                left join pet_clinic_kota on pet_clinic_kota.id = pet_clinic_client.city
                left join sale_order on sale_order.pet_visitation_sale = pet_clinic_visitation.id
                where pet_clinic_visitation.visitation_id = '${id}'`
  const client = await pool.connect();
  const result = await client.query(query);
  const userData = result.rows;
  client.release();
  res.send(userData)
});

module.exports = router;
