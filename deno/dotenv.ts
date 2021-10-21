import { exists } from 'https://deno.land/std@0.95.0/fs/mod.ts';
export default async (envLocation=Deno.cwd()+'/.env')=>{
	if(!(await exists(envLocation))) throw new Error('Environment file not found');
	(await fetch(envLocation)).toString()
	.split("\n").forEach((env: string)=>{
		const [key, ...values] = env.split('=');
		Deno.env.set(key, values.join('='));
	});
}