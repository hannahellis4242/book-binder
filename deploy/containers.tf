# containers
resource "docker_container" "redis" {
  image   = docker_image.redis.image_id
  name    = "redis"
  restart = "always"
  networks_advanced {
    name = docker_network.book-binder-default.name
  }
}

resource "docker_container" "page_sequence" {
  image   = docker_image.page_sequence.image_id
  name    = "page_sequence"
  restart = "always"
  networks_advanced {
    name = docker_network.book-binder-default.name
  }
}

resource "docker_container" "sigature_finder" {
  image   = docker_image.sigature_finder.image_id
  name    = "sigature_finder"
  restart = "always"
  networks_advanced {
    name = docker_network.book-binder-default.name
  }
}

resource "docker_container" "signature_order" {
  image   = docker_image.signature_order.image_id
  name    = "signature_order"
  restart = "always"
  networks_advanced {
    name = docker_network.book-binder-default.name
  }
}

resource "docker_container" "web" {
  image   = docker_image.web.image_id
  name    = "web"
  restart = "always"
  ports {
    internal = 8080
    external = 80
  }
  networks_advanced {
    name = docker_network.book-binder-default.name
  }
}
