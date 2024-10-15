class Phone {
  static async create ({
    brand,
    model,
    os,
    screen_size,
    ram,
    storage_capacity,
    battery_capacity,
    camera_megapixels,
    price,
    release_date,
    color,
    is_dual_sim,
  }) {
    try {
      const query = `
        INSERT INTO phones (brand, model, os, screen_size, ram, storage_capacity, battery_capacity, camera_megapixels, price, release_date, color, is_dual_sim)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *;
        `;

      const {
        rows: [createdPhone],
      } = await Phone.pool.query(query, [
        brand,
        model,
        os,
        screen_size,
        ram,
        storage_capacity,
        battery_capacity,
        camera_megapixels,
        price,
        release_date,
        color,
        is_dual_sim,
      ]);

      return createdPhone;
    } catch (error) {
      throw error;
    }
  }

  static async getAll (limit, offset) {
    try {
      const query = `
        SELECT *
        FROM phones 
        ORDER BY id
        LIMIT $1 OFFSET $2
      `;

      const { rows } = await Phone.pool.query(query, [limit, offset]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById (phoneId) {
    try {
      const query = `
            SELECT *
            FROM phones 
            WHERE id = $1
      `;

      const {
        rows: [foudPhone],
      } = await Phone.pool.query(query, [phoneId]);
      return foudPhone;
    } catch (error) {
      throw error;
    }
  }

  static async updateById (
    {
      brand,
      model,
      os,
      screen_size,
      ram,
      storage_capacity,
      battery_capacity,
      camera_megapixels,
      price,
      release_date,
      color,
      is_dual_sim,
    },
    phoneId
  ) {
    try {
      const query = `
        UPDATE phones 
        SET brand = $1,
            model = $2,
            os = $3,
            screen_size = $4,
            ram = $5,
            storage_capacity = $6,
            battery_capacity = $7,
            camera_megapixels = $8,
            price = $9,
            release_date = $10,
            color = $11,
            is_dual_sim = $12
        WHERE id = $13
        RETURNING *
      `;

      const {
        rows: [updatedPhone],
      } = await Phone.pool.query(query, [
        brand,
        model,
        os,
        screen_size,
        ram,
        storage_capacity,
        battery_capacity,
        camera_megapixels,
        price,
        release_date,
        color,
        is_dual_sim,
        phoneId,
      ]);
      return updatedPhone;
    } catch (error) {
      throw error;
    }
  }

  static async deleteById (phoneId) {
    try {
      const query = `
        DELETE FROM phones 
        WHERE id = $1
        RETURNING 1;
      `;

      const {
        rows: [foundPhone],
      } = await Phone.pool.query(query, [phoneId]);

      return foundPhone;
    } catch (error) {
      throw error;
    }
  }

  static async getPhonesByUser (userId) {
    try {
      const query = `
        SELECT p.*
        FROM users AS u INNER JOIN orders AS o ON u.id = o.user_id
                        INNER JOIN phones_to_orders AS p_to_o ON o.id = p_to_o.order_id
                        INNER JOIN phones AS p ON p_to_o.phone_id = p.id
        WHERE u.id = $1
      `;

      const { rows } = await Phone.pool.query(query, [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getPhonesByUserByBrand (userId, phoneBrand) {
    try {
      const query = `
        SELECT p.*
        FROM users AS u INNER JOIN orders AS o ON u.id = o.user_id
                        INNER JOIN phones_to_orders AS p_to_o ON o.id = p_to_o.order_id
                        INNER JOIN phones AS p ON p_to_o.phone_id = p.id
        WHERE u.id = $1 AND p.brand = $2
      `;

      const { rows } = await Phone.pool.query(query, [userId, phoneBrand]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Phone;
