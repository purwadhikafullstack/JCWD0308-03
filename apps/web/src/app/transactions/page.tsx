'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div className="min-h-screen text-black bg-white p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Konfirmasikan dan bayar</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div>
            <div className="card shadow-lg bg-white p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Perjalanan Anda</h2>
              <div className="flex justify-between mb-4">
                <div>
                  <p>Tanggal</p>
                  <p>23-28 Jun</p>
                </div>
                <button className="link link-primary">Edit</button>
              </div>
              <div className="flex justify-between mb-4">
                <div>
                  <p>Tamu</p>
                  <p>1 tamu</p>
                </div>
                <button className="link link-primary">Edit</button>
              </div>
            </div>

            <div className="card shadow-lg bg-white p-6">
              <h2 className="text-xl font-semibold mb-4">Bayar menggunakan</h2>
              <div className="mb-4">
                <select className="select select-bordered w-full">
                  <option selected>Kartu kredit atau debit</option>
                  <option>VISA</option>
                  <option>Gopay</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Nomor kartu"
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Kedaluwarsa"
                  className="input input-bordered w-full mt-4"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="input input-bordered w-full mt-4"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Alamat jalan"
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Nomor apartemen atau suite"
                  className="input input-bordered w-full mt-4"
                />
                <input
                  type="text"
                  placeholder="Kota"
                  className="input input-bordered w-full mt-4"
                />
                <input
                  type="text"
                  placeholder="Negara Bagian"
                  className="input input-bordered w-full mt-4"
                />
                <input
                  type="text"
                  placeholder="Kode pos"
                  className="input input-bordered w-full mt-4"
                />
                <select className="select select-bordered w-full mt-4">
                  <option selected>Indonesia</option>
                  {/* Add other options as needed */}
                </select>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div>
            <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                className="h-56 w-full object-cover"
              />

              <div className="bg-white p-4 sm:p-6">
                <a href="#">
                  <h3 className="mt-0.5 text-lg text-gray-900">
                    How to position your furniture for positivity
                  </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Recusandae dolores, possimus pariatur animi temporibus
                  nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                  quidem, mollitia itaque minus soluta, voluptates neque
                  explicabo tempora nisi culpa eius atque dignissimos. Molestias
                  explicabo corporis voluptatem?
                </p>
              </div>
            </article>

            <div className="card shadow-lg bg-white p-6">
              <h2 className="text-xl font-semibold mb-4">Perincian harga</h2>
              <div className="mb-4 flex justify-between">
                <span>Rp6.852.150,00 x 5 malam</span>
                <span>Rp34.260.750,00</span>
              </div>
              <div className="mb-4 flex justify-between">
                <span>Biaya kebersihan</span>
                <span>Rp1.581.265,00</span>
              </div>
              <div className="mb-4 flex justify-between">
                <span>Pajak</span>
                <span>Rp1.189.463,00</span>
              </div>
              <div className="font-bold flex justify-between">
                <span>Total (IDR)</span>
                <span>Rp37.031.478,00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Diperlukan untuk perjalanan Anda
          </h2>
          <div className="card shadow-lg bg-white p-6">
            <input
              type="text"
              placeholder="Nomor telepon"
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary w-full mt-4">Tambahkan</button>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Kebijakan pembatalan</h2>
          <div className="card shadow-lg bg-white p-6">
            <p>
              Jika dibatalkan sebelum 16 Jun, Anda akan mendapatkan pengembalian
              uang sebagian. Setelah itu, biaya reservasi ini tidak dapat
              dikembalikan.
            </p>
            <a href="#" className="link link-primary">
              Pelajari selengkapnya
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
