// مقادیر مجاز: 'published', 'revising', 'accepted', 'finalizing', 'in-prep'
const publications = [
    {
        status: 'published',
        title: 'State-Space Adaptive Exploration for Explainable Particle Swarm Optimization',
        journal: 'Swarm and Evolutionary Computation, Vol. 94, 101868, 2025',
        link: 'https://www.sciencedirect.com/science/article/abs/pii/S2210650225000264',
        abstract: 'A systems theory framework for swarm optimization algorithms promises the rigorous analysis of swarm behaviors and systematic approaches that could avoid ad hoc parameter settings and achieve guaranteed performances. However, optimization processes must treat various systems theory concepts, such as stability and controllability, differently, as swarm optimization relies on preserving diversity rather than reaching uniform agent behavior. This work addresses this duality of perspective and proposes State-Space Particle Swarm Optimization (SS-PSO) using the feedback concept in control systems theory. By exploiting the hidden analogy between these two paradigms, we introduce the concept of controllability for optimization purposes through state-space representation. Extending controllability to particle swarm optimization (PSO) highlights the ability to span the search space, emphasizing the significance of particles\' movement rather than their loss of diversity. Furthermore, adaptive exploration (AE) using an iterative bisection algorithm is proposed for the PSO parameters that leverages this controllability measure and its minimum singular value to facilitate explainable swarm behaviors and escape local minima. Theoretical and numerical analyses reveal that SS-PSO is only uncontrollable when the cognitive factor is zero, implying less exploration. Finally, AE enhances exploration by increasing the controllability matrix\'s minimum singular value. This result underscores the profound connection between the controllability matrix and exploration, a critical insight that significantly enhances our understanding of swarm optimization. AE-based State-Space-PSO (AESS-PSO) shows improved exploration and performance over PSO in 86 SOP and CEC benchmarks, particularly for smaller populations.'
    },
    {
        status: 'published',
        title: 'Rank-based Adaptive Brooding in Mimetic Coral Reefs Search',
        journal: 'AUT Journal of Modeling and Simulation, 56(2), 171-184, 2024',
        link: 'https://miscj.aut.ac.ir/article_5581.html',
        abstract: 'Mimetic Coral Reefs Optimization (MCRO) has proven highly effective for feature selection due to its capacity to explore diverse solution spaces, enhancing model accuracy and robustness. However, integrating MCRO with local search techniques remains challenging, as it tends to be computationally intensive and prone to premature convergence. To address these issues, this paper introduces a Rank-based Adaptive Brooding (RAB) mechanism, designed to refine the local mimetic search strategy within MCRO. RAB adaptively adjusts the brooding operator based on the ranks of coral larvae, minimizing disruption to high-rank larvae and harnessing the exploratory potential of lower-rank larvae. This approach promotes a more balanced exploration-exploitation trade-off, leading to faster convergence and enhanced performance in complex problem spaces. The proposed method\'s efficacy is tested across eight UCI datasets using KNN, Decision Tree, and SVM classifiers, and the results are evaluated by precision, recall, and F1 score. Empirical results reveal that RAB outperforms existing adaptive strategies with fixed brooding, delivering superior feature selection performance, particularly in high-dimensional datasets. Additionally, the optimization capabilities of RAB were examined using 39 CEC benchmark functions, revealing consistent improvements in feature selection accuracy while demonstrating variable outcomes in broader optimization tasks. Notably, RAB showed significant enhancements in eight benchmark cases, highlighting its potential for broader applicability in optimization scenarios.'
    },
    {
        status: 'published',
        title: 'Counterintuitive Benefits of Time Window Constraints: Enhancing Cost Efficiency in Vehicle Routing Problems',
        journal: 'ICEE 2025 Conference',
        link: 'https://iceeconf.ir/fa/Home/Article/0331f525-7f63-424c-81e6-ed18ae83ad02',
        abstract: 'Conventional wisdom holds that adding constraints to optimization problems, such as Vehicle Routing Problems (VRPs), increases computational complexity and reduces efficiency. This study challenges this assumption. By introducing time window constraints (VRPTW) into VRP models and evaluating them across datasets of varying sizes, results reveal an unexpected outcome: the additional constraints lead to considerable cost reductions—up to 13.3% on average, over 30 independent runs. These results defy traditional expectations, demonstrating that well-crafted constraints can streamline optimization processes and enhance results. This insight into complex logistical systems opens new avenues for leveraging constraints as strategic tools to improve performance in complex logistical systems, redefining their role in optimization theory and practice.'
    },
    {
        status: 'published',
        title: 'Optimizing Magnetic Sensory Configuration for Gesture Recognition in Bionic Hands',
        journal: 'ICCKE 2025 Conference'
    },
    {
        status: 'accepted',
        title: 'A Questionnaire-Based Roadmap for Academic Writing',
        journal: 'Book Chapter in "Generative AI-Enhanced Research: Ethical, Practical, and Transformative Approaches"'
    },
    {
        status: 'finalizing',
        title: 'A Novel Encoding for Solving Vehicle Routing Problem',
        journal: 'Submission to Nature Computational Science'
    },
    {
        status: 'finalizing',
        title: 'Wind Farm Layout Optimization by AESS-PSO',
        journal: 'Scientia Iranica'
    },
    {
        status: 'finalizing',
        title: 'A Sign-Function-Based Analog Circuit for Direct Hardware Realization of the Ternary Conditional Operator',
        journal: 'Patent/Hardware Implementation'
    },
    {
        status: 'revising',
        title: 'Swarmorphic Computing: Transparent Analog Circuit Realizable PSO'
    },
    {
        status: 'revising',
        title: 'A New Model for School Service Vehicle Routing Problem',
        journal: 'TBD'
    },
    {
        status: 'revising',
        title: 'Comment: A transformative definition for the Stability',
        journal: '_'
    },
    {
        status: 'finalizing',
        title: 'Metaheuristic Approaches for Client Selection in Federated Learning: A Mini-Survey',
        journal: 'Journal Paper'
    },
    {
        status: 'finalizing',
        title: 'XAI review in microgrids'
    },
    {
        status: 'in-prep',
        title: 'A New Interpretable Swap Operator for Simulated Annealing Applied to VRPs'
    },
    {
        status: 'in-prep',
        title: 'New Benchmark Function Generator'
    },
    {
        status: 'in-prep',
        title: 'AESSMOPSO: Multiagent AESSPSO for dynamic'
    },
    {
        status: 'in-prep',
        title: 'Patient Allocation in Hospital'
    }
];
