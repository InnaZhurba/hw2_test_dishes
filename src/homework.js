/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

class Bolognese extends Dish{
    constructor() {
        super(10);
        this.name = 'Bolognese';
        this.ingredients = [new Ingridient('spaghetti',1),
            new Ingridient('tomato',2)];
    }
}

class MashedPotatoes extends Dish{
    constructor() {
        super(8);
        this.name = 'MashedPotatoes';
        this.ingredients = [new Ingridient('potato',1)];
    }
}

class Steak extends Dish{
    constructor() {
        super(7);
        this.name = 'Steak';
        this.ingredients = [new Ingridient('meat',2)];
    }
}

class SteakAndFries extends Dish{
    constructor() {
        super(7);
        this.name = 'SteakAndFries';
        this.ingredients = [new Ingridient('meat',1),
            new Ingridient('potato',2)];
    }
}

class Ingridient {
    constructor(name, count) {
        this.name = name;
        this.count = count;
    }

    decreaseCount(num) {
        this.count -= num;
    }
}

class Kitchen {
    constructor() {
        this.dishes = [];
        this.ingredients = [];
    }

    addToFridge(ingredient) {
        ingredient.forEach((data) => this.ingredients.push(data))
    }

    compareIngredients(dishIngerdients) {
        console.log('**** what I need:');
        dishIngerdients.forEach((data) => console.log(data.name + ' ' + data.count));
        console.log('**** what I have:');
        this.ingredients.forEach((data) => console.log(data.name + ' ' + data.count));

        let count = 0;
        (dishIngerdients.forEach(
            (ingredient) => {
                this.ingredients.forEach((data) => {
                    if (data.name === ingredient.name) {
                        if(data.count >= ingredient.count) {
                            //console.log(data.name + ' ' + data.count + '='
                            //    + ingredient.name + ' ' + ingredient.count + ' true');
                            count++;
                        }
                    }
                    else {
                        //console.log(data.name + ' ' + data.count + '='
                        //    + ingredient.name + ' ' + ingredient.count + ' false');
                    }
                });
            }))

        return count === dishIngerdients.length;
    }

    reserveIngredients(dishIngerdients) {
        (dishIngerdients.forEach(
            (ingredient) => {
                this.ingredients.forEach((data) => {
                    if (data.name === ingredient.name) {
                        if(data.count >= ingredient.count) {
                            data.decreaseCount(ingredient.count);
                        }
                    }
                });
            }))
    }

    order(dish) {
        console.log('//////////// ' + dish.name);

        if (this.compareIngredients(dish.ingredients)) {
            console.log("**** We can cook it!");
            this.dishes.push(dish);
            this.reserveIngredients(dish.ingredients);
        } else console.log("**** Error! We don`t have enough ingredients!");
    }


    cookFastestOrder() {
        let arr = this.dishes;
        let fastestOrder = arr.reduce((a,b) =>
            a.cookingTime < b.cookingTime
                ? a:b)

        fastestOrder.cook();
        console.log(fastestOrder.name + ' is cooking with the best time : ' + fastestOrder.cookingTime)

        this.dishes.pop(fastestOrder);
        return fastestOrder;
    }

    cookAllOrders() {
        this.dishes.forEach((dish) => {dish.cook(); console.log(dish.name + ' is cooking');})

        //return this.dishes;
    }
}

async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    await kitchen.cookAllOrders(); // Returns two dishes in array

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
}

test();