workflow "Release Update to Arvernus Update Server" {
  resolves = ["Arvernus Release Package Version"]
  on = "release"
}

action "Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install"]
  args = "run build"
}

action "Arvernus Release Package Version" {
  uses = "Arvernus/action-arvernus-release-update@master"
  needs = ["Build"]
  secrets = [
    "SECRET_KEY",
    "GITHUB_TOKEN",
    "ARVERNUS_SECRET_KEY",
  ]
}
