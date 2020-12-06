module.exports = {
  apps : [{
    name:'ntcs',
    script: 'ntcs.js',
    watch: '5000'
  }, {
    script: './ntcs.js',
    // script: './service-worker/',
    // watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'gxc',
      host : '192.168.1.102',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
