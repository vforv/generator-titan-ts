'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    // this.log(
    //   yosay(`Welcome to the rad ${chalk.red('generator-titan-ts')} generator!`)
    // );

    const prompts = [
      {
        type: 'input',
        name: 'serviceName',
        message: 'Enter service name(if multiple words separate with -)?',
        default: 'ping'
      },
      {
        type: 'input',
        name: 'serviceDesc',
        message: 'Describe this service?',
        default: 'This service use just for testing it will create ping date route which return date.'
      },
      {
        type: 'input',
        name: 'serviceAuthor',
        message: 'Full name of service main maintaine?',
        default: 'Vladimir Djukic'
      },
      {
        type: 'confirm',
        name: 'crud',
        message: 'Is this CRUD service?'
      },
      {
        type: 'input',
        name: 'coverage',
        message: 'Enter how much (%) should be minimum for this service? (Put number from 1-100)',
        default: '100'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;

      this.props = props;

      if (/^[a-z- ]*$/.test(this.props.serviceName) == false) {
        this.log(chalk.red('Service name must be lowecase and multiple words should be separated with (-).'));
        process.exit();
      }

      if (this.props.serviceName.slice(-1) == '-' || this.props.serviceName.charAt(0) == '-') {
        this.log(chalk.red('Service name should not contain (-) on the end and begining.'));
        process.exit();
      }

      if (this.props.serviceDesc.length < 20) {
        this.log(chalk.red('Service description should be at last 20 char long.'));
        process.exit();
      }

      if (parseInt(this.props.coverage) > 100 || parseInt(this.props.coverage) < 1) {
        this.log(chalk.red('Coverage should be between 1 and 100'));
        process.exit();
      }

      // if (parseInt(this.props.coverage) > 100 || parseInt(this.props.coverage) < 1) {
      //   this.log(chalk.red('Coverage should be between 1 and 100'));
      //   process.exit();
      // }

    });
  }


  writing() {
    let serviceName = this.props.serviceName;

    let pro = Object.assign({}, this.props);

    pro.serviceFullName = this.props.serviceName
      .split('-')
      .map(word => word.trim())
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    pro.serviceCC = this.props.serviceName
      .split('-')
      .map(word => word.trim())
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    pro.serviceValidatorConst = this.props.serviceName
      .split('-')
      .map(word => word.trim().toUpperCase())
      .join('_');

    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath(),
      pro
    );

    this.fs.copyTpl(
      this.templatePath('service/src/model/data/_model.ts'),
      this.destinationPath(`titan-${serviceName}/src/model/data/${serviceName}-data.model.ts`),
      pro
    );

    this.fs.copyTpl(
      this.templatePath('service/src/validator/_index.ts'),
      this.destinationPath(`titan-${serviceName}/src/validator/index.ts`),
      pro
    );

    this.fs.copyTpl(
      this.templatePath('service/_gitignore'),
      this.destinationPath(`titan-${serviceName}/.gitignore`),
      pro
    );

    this.fs.copyTpl(
      this.templatePath('service/_dockerignore'),
      this.destinationPath(`titan-${serviceName}/.dockerignore`),
      pro
    );

    // CRUD
    if (this.props.crud) {
      this.fs.copyTpl(
        this.templatePath('service/test/_crud.ts'),
        this.destinationPath(`titan-${serviceName}/test/crud.ts`),
        pro
      );

      this.fs.copyTpl(
        this.templatePath('service/src/logic/_index.ts'),
        this.destinationPath(`titan-${serviceName}/src/logic/index.ts`),
        pro
      );

      this.fs.copyTpl(
        this.templatePath('service/src/logic/_create.logic.ts'),
        this.destinationPath(`titan-${serviceName}/src/logic/create.logic.ts`),
        pro
      );

      this.fs.copyTpl(
        this.templatePath('service/src/logic/_delete.logic.ts'),
        this.destinationPath(`titan-${serviceName}/src/logic/delete.logic.ts`),
        pro
      );

      this.fs.copyTpl(
        this.templatePath('service/src/logic/_update.logic.ts'),
        this.destinationPath(`titan-${serviceName}/src/logic/update.logic.ts`),
        pro
      );

      this.fs.copyTpl(
        this.templatePath('service/src/logic/_read.logic.ts'),
        this.destinationPath(`titan-${serviceName}/src/logic/read.logic.ts`),
        pro
      );

      this.fs.copyTpl(
        this.templatePath('service/src/logic/_read-one.logic.ts'),
        this.destinationPath(`titan-${serviceName}/src/logic/read-one.logic.ts`),
        pro
      );

      this.fs.copyTpl(
        this.templatePath('service/src/route/_routes.ts'),
        this.destinationPath(`titan-${serviceName}/src/route/routes.ts`),
        pro
      );


    }
    // CRUD
    else
    // WITHOUT CRUD
    {
      this.fs.copyTpl(
        this.templatePath('service/src/logic/_index1.ts'),
        this.destinationPath(`titan-${serviceName}/src/logic/index.ts`),
        pro
      );

      this.fs.copyTpl(
        this.templatePath('service/src/logic/_service.logic.ts'),
        this.destinationPath(`titan-${serviceName}/src/logic/service.logic.ts`),
        pro
      );

      this.fs.copyTpl(
        this.templatePath('service/src/route/_routes1.ts'),
        this.destinationPath(`titan-${serviceName}/src/route/routes.ts`),
        pro
      );

      this.fs.copyTpl(
        this.templatePath('service/test/_index.ts'),
        this.destinationPath(`titan-${serviceName}/test/index.ts`),
        pro
      );
    }
    // WITHOUT CRUD

    this.fs.move(
      this.destinationPath('service/**'),
      this.destinationPath(`titan-${serviceName}`)
    )
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
};
