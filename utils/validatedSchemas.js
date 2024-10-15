const yup = require('yup');

const phoneValidationRules = {
  brand: yup.string().min(2).max(50),
  model: yup.string().min(1).max(100),
  os: yup
    .string()
    .oneOf(['iOS', 'Android', 'Windows', 'Other'], 'Invalid operating system'),
  screen_size: yup.number().min(2.0).max(8.0),
  ram: yup.number().min(1).max(16),
  storage_capacity: yup.number().min(4).max(2048),
  battery_capacity: yup.number().min(1000).max(10000),
  camera_megapixels: yup.number().min(2).max(108),
  price: yup.number().min(0).max(5000),
  release_date: yup.date().max(new Date()),
  color: yup.string().min(3).max(30),
  is_dual_sim: yup.boolean(),
};

module.exports.CREATE_PHONE_VALIDATION_SCHEMA = yup.object({
  ...phoneValidationRules,
  brand: phoneValidationRules.brand.required(),
  model: phoneValidationRules.model.required(),
  os: phoneValidationRules.os.required(),
  screen_size: phoneValidationRules.screen_size.required(),
  ram: phoneValidationRules.ram.required(),
  storage_capacity: phoneValidationRules.storage_capacity.required(),
  battery_capacity: phoneValidationRules.battery_capacity.required(),
  camera_megapixels: phoneValidationRules.camera_megapixels.required(),
  price: phoneValidationRules.price.required(),
  release_date: phoneValidationRules.release_date.required(),
  color: phoneValidationRules.color.required(),
  is_dual_sim: phoneValidationRules.is_dual_sim.required(),
});

module.exports.UPDATE_PHONE_VALIDATION_SCHEMA = yup.object({
  ...phoneValidationRules,
});

module.exports.PAGE_VALIDATION_SCHEMA = yup.number().min(1).integer();
module.exports.RESULTS_VALIDATION_SCHEMA = yup
  .number()
  .min(5)
  .max(50)
  .integer();
