let productosGamer = [
  {
    id: 1,
    nombre: "Logitech G502",
    category: "Gaming Mouse",
    manufacturer: "Logitech",
    price: 49.99,
    stock: 2,
  },
  {
    id: 2,
    nombre: "Razer BlackWidow Elite",
    category: "Gaming Keyboard",
    manufacturer: "Razer",
    price: 169.99,
    stock: 2,
  },
  {
    id: 3,
    nombre: "SteelSeries Arctis Pro",
    category: "Gaming Headset",
    manufacturer: "SteelSeries",
    price: 179.99,
    stock: 2,
  },
  {
    id: 4,
    nombre: "ASUS ROG Strix GeForce RTX 3080",
    category: "Graphics Card",
    manufacturer: "ASUS",
    price: 699.99,
    stock: 2,
  },
  {
    id: 5,
    nombre: "HyperX Alloy Origins",
    category: "Gaming Keyboard",
    manufacturer: "HyperX",
    price: 109.99,
    stock: 2,
  },
  {
    id: 6,
    nombre: "Corsair K70 RGB MK.2",
    category: "Gaming Keyboard",
    manufacturer: "Corsair",
    price: 159.99,
    stock: 2,
  },
  {
    id: 7,
    nombre: "LG 27GL850-B",
    category: "Gaming Monitor",
    manufacturer: "LG",
    price: 499.99,
    stock: 2,
  },
  {
    id: 8,
    nombre: "Sony PlayStation 5",
    category: "Gaming Console",
    manufacturer: "Sony",
    price: 499.99,
    stock: 2,
  },
  {
    id: 9,
    nombre: "Microsoft Xbox Series X",
    category: "Gaming Console",
    manufacturer: "Microsoft",
    price: 499.99,
    stock: 2,
  },
  {
    id: 10,
    nombre: "Logitech G Pro X Superlight",
    category: "Gaming Mouse",
    manufacturer: "Logitech",
    price: 149.99,
    stock: 2,
  },
];

menuPrincipal(productosGamer);

function menuPrincipal(productosGamer) {
  let carrito = [];

  let opcion;
  do {
    opcion = Number(
      prompt(
        "Ingrese la opción deseada\n1 - Listar productos\n2 - Ver información de producto\n3 - Agregar producto al carrito\n4 - Filtrar por categoria\n5 - Ordenar por precio ASC\n6 - Ordenar por precio DESC\n7 - Finalizar compra\n0 - Salir"
      )
    );
    switch (opcion) {
      case 1:
        alert(listarProductos(productosGamer));
        break;
      case 2:
        verDatosProducto();
        break;
      case 3:
        agregarProductoCarrito(productosGamer, carrito);
        break;
      case 4:
        filtrarPorCategoria();
        break;
      case 5:
        ordenar(productosGamer, "price", true);
        alert(listarProductos(productosGamer, "name", "price"));
        break;
      case 6:
        ordenar(productosGamer, "price", false);
        alert(listarProductos(productosGamer, "name", "price"));
        break;
      case 7:
        finalizarCompra(carrito);
        carrito = [];
        break;

      default:
        break;
    }
  } while (opcion != 0);
  alert("Muchas gracias 👋\nVuelva pronto");
}

function listarProductos(productosGamer) {
  return productosGamer
    .map((gamer) => gamer.id + " - " + gamer.nombre + " - $" + gamer.price)
    .join("\n");
}

function ordenar(productosGamer, propiedad, esAscendente) {
  productosGamer.sort((a, b) => {
    if (a[propiedad] < b[propiedad]) {
      return -1;
    }
    if (a[propiedad] > b[propiedad]) {
      return 1;
    }
    return 0;
  });
  if (!esAscendente) {
    productosGamer.reverse();
  }
}

function agregarProductoCarrito(productosGamer, carrito) {
  let id = Number(
    prompt(`Seleccione el producto por id:\ ${listarProductos(productosGamer)}`)
  );
  let productoSolicitado = productosGamer.find(
    (producto) => producto.id === id
  );
  let productoAgregado = carrito.find(
    (producto) => producto.id === productoSolicitado.id
  );

  if (productoSolicitado.stock > 0) {
    if (productoAgregado) {
      productoAgregado.unidades++;
      productoAgregado.subtotal =
        productoAgregado.unidades * productoAgregado.price;
    } else {
      carrito.push({
        id: productoSolicitado.id,
        name: productoSolicitado.nombre,
        price: productoSolicitado.price,
        unidades: 1,
        subtotal: productoSolicitado.price,
      });
    }
    productoSolicitado.stock--;
    alert("Producto agregado");
  } else {
    alert("Producto agotado 😔");
  }
}

function finalizarCompra(carrito) {
  if (carrito.length === 0) {
    alert("Primero debe agregar productos al carrito");
  } else {
    let total = carrito.reduce((acum, producto) => acum + producto.subtotal, 0);
    alert("El total a pagar es " + total);
    alert("Gracias por su compra");
  }
}

function verDatosProducto() {
  let consultaUsuario = Number(prompt("Ingrese el ID del producto a buscar"));

  let buscandoProducto = productosGamer.find(
    (producto) => producto.id === consultaUsuario
  );
  if (buscandoProducto) {
    alert(`Nombre: ${buscandoProducto.nombre}
    Categoria: ${buscandoProducto.category}
    Fabricante: ${buscandoProducto.manufacturer}
    Precio: ${buscandoProducto.price}
    Stock: ${buscandoProducto.stock}`);
  } else {
    alert("Producto no existe");
  }
}

function filtrarPorCategoria() {
  let fabricante = prompt(
    "Ingrese el nombre del fabricante a filtrar:\nLogitech\nRazer\nSteelSeries\nASUS\nHyperX\nCorsair\nLG\nSony\nMicrosoft\n"
  );
  let filtrarPorCategoria = productosGamer.filter(
    (producto) => producto.manufacturer === fabricante
  );
  if (filtrarPorCategoria.length === 0) {
    alert(listarProductos(filtrarPorCategoria));
  } else {
    alert("Fabricante no esta en nuestro stock");
  }
}
