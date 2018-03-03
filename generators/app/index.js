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

    });
  }

  writing() {
    const serviceName = this.props.serviceName;

    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath(),
      this.props
    );

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
