const {fileExists, readFile} = require('fs').promise;

export const dotenv = async (envLocation=process.cwd()+'/.env')=>{
	if(!(await fileExists(envLocation))) throw new Error('Environment file not found');
	(await readFile(envLocation))
	.split("\n").forEach((env)=>{
		const [key, ...values] = env.split('=');
		process.env[key] = values.join('=');
	});
}

export default dotenv;