export function formatNumberToBRL(number: any) {
    return number.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }); 
}