import {
  Container,
  Filters,
  ProductCard,
  Title,
  TopBar,
} from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                items={[
                  {
                    id: 1,
                    name: "Пицца с сыром",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    items: [
                      {
                        id: 1,
                        price: 100,
                      },
                    ],
                  },
                  {
                    id: 2,
                    name: "Пицца с сыром",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    items: [
                      {
                        id: 1,
                        price: 100,
                      },
                    ],
                  },
                  {
                    id: 3,
                    name: "Пицца с сыром",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    items: [
                      {
                        id: 1,
                        price: 100,
                      },
                    ],
                  },
                  {
                    id: 4,
                    name: "Пицца с сыром",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    items: [
                      {
                        id: 1,
                        price: 100,
                      },
                    ],
                  },
                  {
                    id: 5,
                    name: "Пицца с сыром",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    items: [
                      {
                        id: 1,
                        price: 100,
                      },
                    ],
                  },
                  {
                    id: 6,
                    name: "Пицца с сыром",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    items: [
                      {
                        id: 1,
                        price: 100,
                      },
                    ],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title="Завтрак"
                items={[
                  {
                    id: 1,
                    name: "Пицца с сыром",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    items: [
                      {
                        id: 1,
                        price: 100,
                      },
                    ],
                  },
                  {
                    id: 2,
                    name: "Пицца с сыром",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    items: [
                      {
                        id: 1,
                        price: 100,
                      },
                    ],
                  },
                  {
                    id: 3,
                    name: "Пицца с сыром",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    items: [
                      {
                        id: 1,
                        price: 100,
                      },
                    ],
                  },
                  {
                    id: 4,
                    name: "Пицца с сыром",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    items: [
                      {
                        id: 1,
                        price: 100,
                      },
                    ],
                  },
                  {
                    id: 5,
                    name: "Пицца с сыром",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    items: [
                      {
                        id: 1,
                        price: 100,
                      },
                    ],
                  },
                  {
                    id: 6,
                    name: "Пицца с сыром",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    items: [
                      {
                        id: 1,
                        price: 100,
                      },
                    ],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
