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
  name = "${local.registery}/book-binder:latest"
}
