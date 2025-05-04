import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from "@material-ui/core/Typography";


import Author from "../Author";
import Contributors from "../Contributors";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(12),
      marginLeft: "auto",
      marginRight: "auto",
      width: "60%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },

    heading: {
      marginTop: theme.spacing(3),
      marginButton: theme.spacing(3),
      color: theme.palette.text.primary,
    },

    paragraph: {
      marginTop: theme.spacing(2),
      marginButton: theme.spacing(2),
      color: theme.palette.text.primary,
    },
  };
});

export default function Informational() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.heading}>
        {" "}
       Sobre o Projeto
      </Typography>
      <Typography variant="body2" className={classes.paragraph}>
        Criado em 6 de Julho de 2021, Matriz Dinâmica nasceu de uma curiosidade simples: 
        como aplicar conceitos de grafos para resolver problemas
        reais? Durante sua graduação em Engenharia de Computação no Instituto
        Federal da Paraíba - Campus Campina Grande, Rafael Guimarães decidiu
        transformar essa ideia em um projeto concreto. A proposta era
        construir uma ferramenta interativa capaz de mapear as relações entre
        disciplinas do curso, mostrando de forma visual e dinâmica quais
        matérias já foram concluídas, quais estão disponíveis para matrícula e
        quais ainda estão bloqueadas. 
        
        Tudo isso com base em conceitos de Teoria
        dos Grafos, como por exemplo o algoritmo de busca em profundidade. O resultado
        foi uma plataforma acessível, funcional e intuitiva  que facilita o planejamento
        acadêmico de forma visual. 
        
        Mesmo após sua saída do IFPB, Rafael, hoje engenheiro de computação formado pelo instituto deixou
        um legado. O projeto continua ajudando centenas de estudantes a navegar
        pelas grade curricular com mais clareza e de forma dinâmica.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        {" "}
        Sobre o Autor{" "}
      </Typography>
      <Author />
      <Typography variant="h5" className={classes.heading}>
        {" "}
        Contribuições{" "}
      </Typography>
      <Contributors />
    </div>
  );
}
