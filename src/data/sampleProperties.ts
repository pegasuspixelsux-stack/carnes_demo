import type { PropertyInput } from '../types/firestore';

type Sample = Omit<PropertyInput, 'agentId'>;

/**
 * Catálogo de muestra (20 productos clave del canal gastronómico). Precios en pesos uruguayos por kilo:
 * `price` = tope del rango mayorista de referencia, `wholesalePrice` = piso. Fotos de maqueta de Wikimedia Commons
 * (licencias libres, créditos en el comentario de cada producto); reemplazalas por fotos propias cuando las tengas.
 */
function sample(
  title: string,
  category: string,
  boxKg: number,
  wholesale: number,
  price: number,
  pack: string,
  image: string,
  description: string,
): Sample {
  return {
    title,
    description: `${description} Presentación: ${pack}.`,
    type: category,
    weight: boxKg,
    unit: 'kg',
    pricingMode: 'por_kilo',
    boxWeight: boxKg,
    price,
    wholesalePrice: wholesale,
    inStock: true,
    // Los campos de abajo no se usan en este catálogo; solo mantienen los datos válidos para las reglas de seguridad.
    operation: 'sale',
    currency: 'UYU',
    location: { city: '', country: '' },
    specs: { bedrooms: 0, bathrooms: 0, areaM2: 0 },
    photos: [{ url: image }],
    deliveryAreas: ['Maldonado'],
    status: 'active',
  };
}

/** Los 20 productos de muestra del sitio (el botón "Importar productos de muestra" carga estos). */
export const sampleProperties: Sample[] = [
  // Raw Texas Roadhouse ribeye steaks.jpg · CC BY-SA 4.0 · https://commons.wikimedia.org/wiki/File:Raw_Texas_Roadhouse_ribeye_steaks.jpg
  sample("Ojo de Bife (Bife Ancho)", 'cortes-parrilla-alta-gama', 17.5, 720, 850, "Al vacío, caja de aprox. 15–20 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Raw_Texas_Roadhouse_ribeye_steaks.jpg/1280px-Raw_Texas_Roadhouse_ribeye_steaks.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Corte estrella de la parrilla: jugoso, bien marmolado y tierno."),
  // La Vaca Loca 300 Bife de Chorizo Sirloin Steak.jpg · CC0 · https://commons.wikimedia.org/wiki/File:La_Vaca_Loca_300_Bife_de_Chorizo_Sirloin_Steak.jpg
  sample("Bife de Chorizo (Bife Angosto)", 'cortes-parrilla-alta-gama', 17.5, 620, 750, "Al vacío, caja de aprox. 15–20 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/La_Vaca_Loca_300_Bife_de_Chorizo_Sirloin_Steak.jpg/1280px-La_Vaca_Loca_300_Bife_de_Chorizo_Sirloin_Steak.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Bife angosto de sabor intenso, con su tapa de grasa."),
  // Beef short ribs.jpg · CC BY-SA 2.0 · https://commons.wikimedia.org/wiki/File:Beef_short_ribs.jpg
  sample("Asado de Tira (Novillo)", 'cortes-parrilla-alta-gama', 16.5, 450, 560, "Tiras envasadas, caja de aprox. 15–18 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Beef_short_ribs.jpg/1280px-Beef_short_ribs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Tiras de novillo para la parrilla, el clásico de todos los asados."),
  // Traditional Argentine asado with grilled vacío beef, chorizo sausage and Russian salad.jpg · CC BY-SA 3.0 · https://commons.wikimedia.org/wiki/File:Traditional_Argentine_asado_with_grilled_vac%C3%ADo_beef,_chorizo_sausage_and_Russian_salad.jpg
  sample("Vacío", 'cortes-parrilla-alta-gama', 15, 550, 630, "Pieza entera al vacío, caja de aprox. 15 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Traditional_Argentine_asado_with_grilled_vac%C3%ADo_beef%2C_chorizo_sausage_and_Russian_salad.jpg/1280px-Traditional_Argentine_asado_with_grilled_vac%C3%ADo_beef%2C_chorizo_sausage_and_Russian_salad.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Pieza entera de cocción lenta, jugosa y de sabor profundo."),
  // Preparations for an argentinian asado 14.JPG · CC BY-SA 4.0 · https://commons.wikimedia.org/wiki/File:Preparations_for_an_argentinian_asado_14.JPG
  sample("Entraña Fina", 'cortes-parrilla-alta-gama', 10, 850, 980, "Al vacío, caja de aprox. 10 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Preparations_for_an_argentinian_asado_14.JPG/1280px-Preparations_for_an_argentinian_asado_14.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Corte fino y sabroso, rápido a la parrilla."),
  // Tenderloin packages.jpg · CC BY-SA 4.0 · https://commons.wikimedia.org/wiki/File:Tenderloin_packages.jpg
  sample("Bife de Lomo", 'cortes-parrilla-alta-gama', 12, 1050, 1190, "Al vacío (con o sin cordón), caja de 12 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Tenderloin_packages.jpg/1280px-Tenderloin_packages.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "El corte más tierno, magro y de textura suave."),
  // Picanha (14759358544).jpg · CC BY 2.0 · https://commons.wikimedia.org/wiki/File:Picanha_(14759358544).jpg
  sample("Pulpón / Picaña", 'cortes-asadores-versatiles', 15, 780, 880, "Al vacío, caja de aprox. 15 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Picanha_%2814759358544%29.jpg/1280px-Picanha_%2814759358544%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Tapa de cuadril con su capa de grasa, ideal para asar entera."),
  // Tri-tip-MCB.jpg · CC BY-SA 2.5 · https://commons.wikimedia.org/wiki/File:Tri-tip-MCB.jpg
  sample("Colita de Cuadril", 'cortes-asadores-versatiles', 12, 680, 790, "Al vacío, caja de aprox. 12 kg",
    "https://upload.wikimedia.org/wikipedia/commons/7/70/Tri-tip-MCB.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "Corte versátil, tierno y de buen rendimiento."),
  // Preparations for an argentinian asado 4.JPG · CC BY-SA 4.0 · https://commons.wikimedia.org/wiki/File:Preparations_for_an_argentinian_asado_4.JPG
  sample("Entraña Gruesa", 'cortes-asadores-versatiles', 12, 550, 690, "Al vacío, caja de aprox. 12 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/Preparations_for_an_argentinian_asado_4.JPG/1280px-Preparations_for_an_argentinian_asado_4.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Entraña de sabor marcado para parrilla y plancha."),
  // Boneless chuck short rib.jpg · CC BY-SA 2.0 · https://commons.wikimedia.org/wiki/File:Boneless_chuck_short_rib.jpg
  sample("Asado sin Hueso (Chuleta Ancha)", 'cortes-asadores-versatiles', 15, 590, 680, "Al vacío, caja de aprox. 15 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Boneless_chuck_short_rib.jpg/1280px-Boneless_chuck_short_rib.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Asado deshuesado, parejo y fácil de porcionar."),
  // Beef round top round steak in pan, raw.jpg · CC BY-SA 3.0 · https://commons.wikimedia.org/wiki/File:Beef_round_top_round_steak_in_pan,_raw.jpg
  sample("Nalga (Pieza / Para milanesas)", 'cortes-cocina-rotiseria', 20, 420, 520, "Al vacío, caja de aprox. 20 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Beef_round_top_round_steak_in_pan%2C_raw.jpg/1280px-Beef_round_top_round_steak_in_pan%2C_raw.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Pieza magra y pareja, la elegida para las milanesas."),
  // Beef round top round steak in pan, raw.jpg · CC BY-SA 3.0 · https://commons.wikimedia.org/wiki/File:Beef_round_top_round_steak_in_pan,_raw.jpg
  sample("Bola de Lomo", 'cortes-cocina-rotiseria', 18, 380, 480, "Al vacío, caja de aprox. 18 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Beef_round_top_round_steak_in_pan%2C_raw.jpg/1280px-Beef_round_top_round_steak_in_pan%2C_raw.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Corte magro para milanesas, guisos y cocción al horno."),
  // A luncheon at Gibside-Lamb chops and rump steaks. (BM 1868,0808.6185).jpg · Public domain · https://commons.wikimedia.org/wiki/File:A_luncheon_at_Gibside-Lamb_chops_and_rump_steaks._(BM_1868,0808.6185).jpg
  sample("Cuadril (Corazón de Cuadril)", 'cortes-cocina-rotiseria', 15, 570, 670, "Al vacío, caja de aprox. 15 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/A_luncheon_at_Gibside-Lamb_chops_and_rump_steaks._%28BM_1868%2C0808.6185%29.jpg/1280px-A_luncheon_at_Gibside-Lamb_chops_and_rump_steaks._%28BM_1868%2C0808.6185%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Corazón de cuadril: tierno y versátil para rotisería y minutas."),
  // A roast beef dinner at The Queen's Head, Boreham, Essex, England - lighter.jpg · CC BY-SA 4.0 · https://commons.wikimedia.org/wiki/File:A_roast_beef_dinner_at_The_Queen%27s_Head,_Boreham,_Essex,_England_-_lighter.jpg
  sample("Roast Beef", 'cortes-cocina-rotiseria', 20, 350, 420, "Bloque al vacío, caja de aprox. 20 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/A_roast_beef_dinner_at_The_Queen%27s_Head%2C_Boreham%2C_Essex%2C_England_-_lighter.jpg/1280px-A_roast_beef_dinner_at_The_Queen%27s_Head%2C_Boreham%2C_Essex%2C_England_-_lighter.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Bloque magro para asar y cortar en fetas."),
  // Smoked Chuck Roast texture14.jpg · CC BY-SA 4.0 · https://commons.wikimedia.org/wiki/File:Smoked_Chuck_Roast_texture14.jpg
  sample("Paleta (Sin Hueso)", 'cortes-cocina-rotiseria', 20, 340, 410, "Bloque al vacío, caja de aprox. 20 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Smoked_Chuck_Roast_texture14.jpg/1280px-Smoked_Chuck_Roast_texture14.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Paleta sin hueso para estofados, guisos y carnes braseadas."),
  // Ossobuco.jpg · CC BY-SA 3.0 · https://commons.wikimedia.org/wiki/File:Ossobuco.jpg
  sample("Osobuco", 'cortes-cocina-rotiseria', 15, 320, 380, "Cortado con hueso, bolsa o caja de 15 kg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e1/Ossobuco.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "Rodajas con hueso y tuétano, para guisos y cocciones largas."),
  // Flank steak with gravy.jpg · CC BY-SA 4.0 · https://commons.wikimedia.org/wiki/File:Flank_steak_with_gravy.jpg
  sample("Falda", 'cortes-cocina-rotiseria', 15, 230, 280, "Pieza, caja de aprox. 15 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Flank_steak_with_gravy.jpg/1280px-Flank_steak_with_gravy.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Corte económico y sabroso para cocciones lentas y rellenos."),
  // TERRIBLE PARRILLADA ARGENTINA - Flickr - dr pablogonzalez.jpg · CC BY-SA 2.0 · https://commons.wikimedia.org/wiki/File:TERRIBLE_PARRILLADA_ARGENTINA_-_Flickr_-_dr_pablogonzalez.jpg
  sample("Mollejas (de corazón)", 'achuras-complementos', 10, 420, 550, "Congeladas o frescas al vacío, caja de 10 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/TERRIBLE_PARRILLADA_ARGENTINA_-_Flickr_-_dr_pablogonzalez.jpg/1280px-TERRIBLE_PARRILLADA_ARGENTINA_-_Flickr_-_dr_pablogonzalez.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Mollejas de corazón, el complemento clásico de la parrilla."),
  // Chorizo parrillero argentino en carnicería (Argentina).jpg · CC BY-SA 3.0 · https://commons.wikimedia.org/wiki/File:Chorizo_parrillero_argentino_en_carnicer%C3%ADa_(Argentina).jpg
  sample("Chorizos Parrilleros / Artesanales", 'achuras-complementos', 7.5, 260, 380, "Pack de origen, caja de 5 a 10 kg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Chorizo_parrillero_argentino_en_carnicer%C3%ADa_%28Argentina%29.jpg/1280px-Chorizo_parrillero_argentino_en_carnicer%C3%ADa_%28Argentina%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "Chorizos parrilleros para el choripán y la parrillada."),
  // Morcilla-burgos 2.jpg · CC BY 2.0 · https://commons.wikimedia.org/wiki/File:Morcilla-burgos_2.jpg
  sample("Morcillas (Bombón / Dulce)", 'achuras-complementos', 5, 350, 420, "Pack de origen, caja de 5 kg",
    "https://upload.wikimedia.org/wikipedia/commons/5/5f/Morcilla-burgos_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "Morcillas bombón y dulces, infaltables en la parrilla."),
];
