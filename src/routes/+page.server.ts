import type { Actions } from './$types';
import { fail } from '@sveltejs/kit'
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';


export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const color = data.get('color');

    //Make sure the user has provided a color
    if (!color) {
      return fail(400, {color, missing: true});
    }

    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Suggest a color palette with 6 colors based on the color ${color}. Have at least two of the colors be a complementary color and a shade of the complementary color. Suggest the colors in hex format and in a comma separated list. Do not respond with any other text.`,
        max_tokens: 80,
      });
      if (completion.data.choices[0].text) {
        return {
          success: true,
          palette: completion.data.choices[0].text.split(',')
        } 
      } else {
        throw new Error('Response from OpenAI was invalid')
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}