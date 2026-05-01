import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'boutique-little-bits',
  title: 'Boutique Little Bits',
  
  projectId: 'y8kpuglx',
  dataset: 'production',
  
  basePath: '/studio',
  
  plugins: [
    structureTool(),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
});
