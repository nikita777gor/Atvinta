export const coinsWordHelper = (count:number):string => {
  const numberArr = count.toString().split("");
  const lastNumber = numberArr[numberArr.length - 1];
  const beforeLastNumber = numberArr[numberArr.length - 2];
  if(beforeLastNumber == 1 || lastNumber == 0 || lastNumber > 4){
    return 'монет'
  }
  if(lastNumber == 1){
    return 'монета'
  }
  return 'монеты'
}
