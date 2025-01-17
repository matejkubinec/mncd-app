export const FORMATS_SAMPLES = {
  edgeList: `
actor_from layer_from actor_to layer_to edge_weight
`.trim(),
  edgeListMetadata: `
# Actors
actor_index actor_name
...
# Layers
layer_index layer_name
...
`.trim(),
  edgeListExample: `
0 0 1 0 1
0 1 1 1 1
0 0 1 1 1

# Actors
0 Actor0
1 Actor1

# Layers
0 Layer0
1 Layer1
`.trim(),
  mpx: `
#TYPE multiplex
#LAYERS
Layer1,UNDIRECTED
Layer2,UNDIRECTED
#ACTORS
Actor1
Actor2
#EDGES
Actor1,Actor2,Layer1,1
Actor1,Actor2,Layer2,1
`.trim(),
};
