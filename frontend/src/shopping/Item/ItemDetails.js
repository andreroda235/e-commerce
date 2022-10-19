import { useState } from 'react';
import Card from '../../shared/components/UIElements/Card';

import classes from './ItemDetails.module.css';

const tabs = [
    'Product Details',
    'Reviews'
];

const description = `Com um aumento na contagem de núcleos, estes processadores continuam a utilizar a arquitetura híbrida de desempenho Intel para otimizar os seus jogos, criação de conteúdo e produtividade. Aproveite a largura de banda líder do setor de até 16 vias PCIe 5.0 e memória DDR5 de até 5600 MT/s. Turbine o desempenho do seu CPU com um poderoso conjunto de ferramentas de ajuste e overclocking. Desfrute das suas experiências favoritas em até 4 monitores 4K60 simultâneos ou vídeo HDR de até 8K60 com supressão de ruído dinâmico. O suporte para chipsets da série Intel® 700 e a compatibilidade retroativa com os chipsets da série Intel® 600 permitem aceder aos recursos de que você precisa para qualquer tarefa. Esteja você a trabalhar, transmitir, jogar ou criar, os processadores para desktop Intel® Core™ da 13ª Geração oferecem a próxima geração de desempenho inovador.

DESEMPENHO DE ÚLTIMA GERAÇÃO
Os processadores para desktop Intel® Core™ da 13ª Geração oferecem a próxima geração de desempenho de núcleo inovador. A tecnologia Intel® Turbo Boost Max 3.0 fortalece ainda mais o desempenho de threading leve, identificando os Performance-cores de melhor desempenho. Enquanto isso, os E-cores adicionais permitem um aumento na Cache Inteligente Intel® (L3) para um processamento mais eficiente de conjuntos de dados maiores e um melhor desempenho. A cache L2 dos P-cores e E-cores também aumentou em comparação com a geração anterior de processadores Intel®, minimizando a quantidade de tempo usada para transferir dados entre o cache e a memória, para acelerar o seu fluxo de trabalho Liberte a potência do desempenho de próximo nível com a vantagem dos processadores para desktop Intel® Core™ da 13ª Geração.

RECURSOS DE PLATAFORMA DINÂMICOS
Carregados com as tecnologias de plataforma mais recentes, os processadores para desktop Intel® Core™ da 13ª Geração aceleram o desempenho do sistema. Até 16 vias PCIe 5.0 duplicam a taxa de transferência de E/S para uma potência de processamento acelerada. Aproveite o mais recente suporte para DDR5 que está a transformar o setor para velocidades rápidas de até 5600 MT/s, alta largura de banda e maior produtividade, bem como o suporte contínuo para DDR4 de até 3200 MT/s. Suporte abrangente para ajuste avançado e overclocking — incluindo o Intel® Extreme Tuning Utility, Intel® Extreme Memory Profile, e Intel® Dynamic Memory Boost — oferecem desempenho de overclocking inteligente, para que overclockers novatos e experientes possam obter mais dos seus processadores desbloqueados. E a compatibilidade retroativa com os chipsets série Intel 600 e 700 oferece a flexibilidade de atualizar sem comprometer o desempenho ou os recursos.

CONSTRUÍDOS PARA JOGOS MODERNOS
Criado para jogadores que procuram o máximo desempenho para jogar os jogos mais recentes, além de ter recursos para lidar com outras cargas de trabalho. Os novos PCs baseados no processador Intel Core de 13ª geração tornam tudo isso possível.

 

Especificações:
Nº de Núcleos: 16
Nº de Performance-cores: 8
Nº de Efficient-cores: 8
Nº de Threads: 24
Frequência Turbo Máxima: 5.40 GHz
Frequência Turbo Máxima do Performance-core: 5.30 GHz
Frequência Turbo Máxima do Efficient-core: 4.20 GHz
Frequência Base do Performance-core: 3.40 GHz
Frequência Base do Efficient-core: 2.50 GHz
Cache: 30 MB Intel® Smart Cache
Cache L2 total: 24 MB
TDP Base: 125 W
TDP Máximo: 253 W
Gráficos Integrados: Não incluídos
Cooler Incluído: Não`;

const ItemDetails = () => {

    const [slide, setSlide] = useState(0);

    const changeTabHandler = (index) => {
        setSlide(index);
    };

    return (
        <Card className={classes.details}>
            <div className={classes.tabs}>
                {tabs.map((tab, index) => (
                    <div 
                        key={'tab' + index} 
                        className={
                            classes.tab + ' ' +
                            classes['tab--' + (index === slide ? 'selected' : 'unselected')]
                        }>
                        <button onClick={changeTabHandler.bind(null, index)}>
                            {tab}
                        </button>
                    </div>
                ))}
            </div>
            <div className={classes.slidebar}>
                <div className={classes.bar} style={{
                    transform   : `translateX(${slide}00%)`,
                    width       : `calc(100%/${tabs.length})`
                }}/>
            </div>
            <div className={classes.content}>
                {description}
            </div>
        </Card>
    );
};

export default ItemDetails;