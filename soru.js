//SORU İLE ALAKALI JS

//Constructor
function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
  }

  //Ekstra bir özellik veya fonksiyon eklemek istediğimizde "prototype" kullanıyoruz.
  //"cevabiKontrolEt" her nesne çağırdığımızda oluşacağı için Constructora'a prototype olarak ekliyoruz. AYnı yerde bir kere kullandık, tüm objeler gelip buradan alacak.
  Soru.prototype.cevabiKontrolEt = function (cevap) {
    //Oluşturulan nesneler çağrılır
    return cevap === this.dogruCevap;
  };


  let sorular = [
    new Soru(
      "1-Hangisi JavaScript paket yönetim uygulamasıdır?",
      { a: "Node.js", b: "TypeScript", c: "Npm", d: "Nuget" },
      "c"
    ),
    new Soru(
      "2-Hangisi frontend kapsamında değerlendirilmez?",
      { a: "css", b: "html", c: "javascript", d:"sql" },
      "d"
    ),
    new Soru(
      "3-Hangisi backend kapsamında değerlendirilir?",
      { a: "Node.js", b: "TypeScript", c: "angular", d:"react" },
      "a"
    ),
    new Soru(
      "4-Hangisi JavaScript programlama dilini kullanmaz?",
      { a: "react", b: "angular", c: "vue.js", d:"asp.net" },
      "d"
    ),
  ];