terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

# images
resource "docker_image" "redis" {
  name = "redis:latest"
}

locals {
  registery = "ghcr.io/hannahellis4242"
}

resource "docker_image" "page_sequence" {
  name = "${local.registery}/bpss/book-page-sequence-service:latest"
}

resource "docker_image" "sigature_finder" {
  name = "${local.registery}/bsfs/book-signature-finder-service:latest"
}

resource "docker_image" "signature_order" {
  name = "${local.registery}/bsoo/book-signature-order-options:latest"
}

resource "docker_image" "web" {
  name = "ghcr.io/hannahellis4242/book-binder:latest"
}

# network
resource "docker_network" "book-binder-default" {
  name = "book-binder-default"
}

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
