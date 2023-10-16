const ad = document.getElementById("name");
const soyad = document.getElementById("surname");
const yas = document.getElementById("age");
const unvan = document.getElementById("location");
const nomre = document.getElementById("number");
const tbody = document.getElementById("tbody");
const yarat = document.getElementById("create-user");
const deyis = document.getElementById("edit-user");

let istifadeciler = [];

const yeniIstifadeciYarat = async () => {
  if (
    ad.value == "" ||
    soyad.value == "" ||
    yas.value == "" ||
    unvan.value == "" ||
    nomre.value == ""
  ) {
    alert("xanalari doldur");
  } else {
    console.log(nomre.value);
    try {
      const sorgu = await fetch("http://localhost:3000/istifadeciler", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ad: ad.value,
          soyad: soyad.value,
          yas: yas.value,
          unvan: unvan.value,
          nomre: nomre.value,
        }),
      });
      if (sorgu.ok) {
        alert("ugurla qeydiyyatdan kecdiz");
      } else {
        alert("istifadeci yaranmadi");
      }
    } catch (error) {
      console.log(error);
    }
  }
};
yarat.addEventListener("click", yeniIstifadeciYarat);

const fetchUsers = async () => {
  try {
    const sorgu = await fetch("http://localhost:3000/istifadeciler");
    const cavab = await sorgu.json();
    console.log(cavab);
    istifadeciler = [...cavab]
    cavab.forEach((item, index, array) => {
      console.log(item);
      tbody.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.ad}</td>
                    <td>${item.soyad}</td>
                    <td>${item.yas}</td>
                    <td>${item.unvan}</td>
                    <td>${item.nomre}</td>
                    <td>         
                        <button  onclick='istifadeciDuzelt(${item.id})'>Duzelt</button>
                    </td>
                    <td>         
                        <button  onclick='istifadeciSil(${item.id})'>Sil</button>
                    </td>
                </tr>
            `;
    });
  } catch (error) {
    console.log(error);
  }
};
fetchUsers();

const istifadeciSil = async (id) => {
  try {
    const req = await fetch(`http://localhost:3000/istifadeciler/${id}`, {
      method: "DELETE",
    });
    if (req.ok) {
      alert("istifadeci silindi");
    } else {
      alert("istifadeci silinerken xeta bas verdi");
    }
  } catch (error) {
    console.error(error);
  }
};

const istifadeciDuzelt = async (id) => {
  console.log(id);
  const tapilanIstifadeci = istifadeciler.find(item=> item.id == id);
  if (tapilanIstifadeci) {
    ad.value = tapilanIstifadeci.ad,
    soyad.value=tapilanIstifadeci.soyad,
    yas.value=tapilanIstifadeci.yas,
    unvan.value=tapilanIstifadeci.unvan,
    nomre.value=tapilanIstifadeci.nomre
    document.getElementById('edit-user').setAttribute('istifadeci-id', tapilanIstifadeci.id)
  }else{
    alert('bele bir istifadeci yoxdur')
  }
};

const istifadeciMelumatiniDeyis = async () => {
  const deyisecekUser = document.getElementById('edit-user').getAttribute('istifadeci-id')
  if (ad.value == "") {
    alert('xanani doldurun')
  }else{
    try {
      const req = await fetch(`http://localhost:3000/istifadeciler/${deyisecekUser}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ad: ad.value,
          soyad: soyad.value,
          yas: yas.value,
          unvan: unvan.value,
          nomre: nomre.value,
        }),
      });
      if(req.ok){
        alert("yeni istifadeci yarandi")
      }
      else{
        
      };
    } catch (error) {
      console.error(error);
    }
  }
}

document.getElementById('edit-user').addEventListener('click',istifadeciMelumatiniDeyis )