#!/usr/bin/env node

const ins = require("util").inspect;
const deb = (...args) => { 
    if (debug) console.log(ins(...args, {depth: null})); 
};

const fs = require("fs");
const shell = require('shelljs');
const { program } = require('commander');
const {version} = require("./package.json");

program 
  .version(version)
  .option('-o, --org <organization>', 'specifies the organization')
  .option('-r, --repo <reponame>', 'specifies the repository')
  .option('-n, --name <name>', 'name');

program.parse(process.argv);

let args = program.args;

const getrepoId = (owner, name) => `
query getrepoId{
    repository(owner: "${owner}", name: "${name}"){
      Id
    }
  }
 `;

const renamerepo = (Id, newName) => `   
  mutation renamerepo{
    updateRepository(input: 
      {
        name: "${newName}"
        repositoryId: "${Id}"
      }
    ) {
      repository{
        name
      }
    }
  }
`;

let { org, repo, name } = program.opts();

if (!org || ! repo || !name) program.help();

if (!shell.which('git')) {
    shell.echo('Sorry, this extension requires git');
}
if (!shell.which('gh')) {
   shell.echo('Sorry, this extension requires GitHub Cli');
}

let r = shell.exec(`gh api graphql -f query='${getrepoId(org, repo)}' --jq '.data.repository.Id'`, 
  {silent: true}
);
if (r.code !== 0) {
  console.error(r.stderr)
  process.exit(r.code)
}

//console.log("getrepoId return: \n", r.stdout)
const Id = r.stdout.replace( /\s/,'')
// \s -> todas los espacios en blanco 
// \s+ -> 
// \n -> retorno de carro
// \ -> tabulador
// si añadimos una g al final: /\s+\g -> se quitarán todos los espacios
// si añadimos un $ /\s+$/ -> solo si es al final 

r = shell.exec(`gh api graphql -f query='${renamerepo(Id, name)}' --jq '.data.updateRepository.repository.name'` , 
  {silent: true}
);
if (r.code !== 0) {
  console.error(r.stderr)
  process.exit(r.code)
}

console.log(`The repo '${org}/${repo}' has been renamed to ${r.stdout}'`)