import { AIModelsTools } from '../../components/AIModelsTools';

export default {
    render: AIModelsTools,
    attributes: {
        popularProviders: { type: Array, default: [] },
        popularModelLabels: { type: Array, default: [] },
        popularModelQueries: { type: Array, default: [] },
    },
};


