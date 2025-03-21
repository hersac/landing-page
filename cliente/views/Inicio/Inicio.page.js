import { Card } from "../../components/Card/Card.component";

alert("Hola mundo");

const inicio = document.querySelector("#inicio");
const cardHeader = document.querySelector("#cardHeader");

const cardComponent = new Card({
    titulo: "Titulo de la tarjeta",
});

cardHeader.appendChild(cardComponent.getDataHtml());